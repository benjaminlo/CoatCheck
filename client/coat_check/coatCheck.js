'use strict';

const Constants = require('../alexa/constants.js');
const format = require('string-format');
const Speech = require('../alexa/speech.js');
const request = require('request');

class CoatCheck {

    /**
     * Construct the CoatCheck object.
     *
     * @param {Object} exports The exports variable to set the Lambda handler onto.
     * @param {Alexa} alexa The {@link Alexa} object.
     */
    constructor(exports, alexa) {
        this._exports = exports;
        this._alexa = alexa;
        this.setLaunchHandler();
        this.setSessionEndedHandler();
        this.setIntentHandlers();
    }

    /**
     * Sets the launch handler.
     * @private
     */
    setLaunchHandler() {
        this._alexa.setLaunchHandler((event, response) => {
            response.ask(new Speech(Constants.SPEECH_TYPE_TEXT, Constants.ALEXA_MESSAGE_OPEN_CLOSET),
                new Speech(Constants.SPEECH_TYPE_TEXT, Constants.ALEXA_MESSAGE_REPROMPT));
        });
    }

    /**
     * Sets the session ended handler.
     * @private
     */
    setSessionEndedHandler() {
        this._alexa.setSessionEndedHandler((event) => {

        })
    }

    /**
     * Sets the intent handlers.
     * @private
     */
    setIntentHandlers() {
        let intentHandlers = {};
        intentHandlers[Constants.INTENT_ADD] = addIntentHandler;
        intentHandlers[Constants.INTENT_ASK] = askIntentHandler;
        intentHandlers[Constants.INTENT_DELETE] = deleteIntentHandler;
        this._alexa.setIntentHandlers(intentHandlers);
    }

    /**
     * Create the lambda connection. Call this last.
     */
    createLambdaConnection() {
        this._alexa.createLambdaConnection(this._exports);
    }

}

let addIntentHandler = (event, response) => {
    let clothing = event.request.intent.slots.ClothingName.value;

    let json = {};
    json[Constants.CLOTHING_KEY_NAME] = clothing;

    let options = {json};

    options[Constants.JSON_KEY_URL] = Constants.URL_ADD;
    options[Constants.JSON_KEY_METHOD] = Constants.HTTP_METHOD_POST;

    return (callback) => {
        request(options, (err, resp) => {
            if (!err && resp.statusCode === Constants.HTTP_RESPONSE_CODE_OK) {
                response.tell(new Speech(Constants.SPEECH_TYPE_TEXT, format(Constants.ALEXA_MESSAGE_ADDED, clothing)));
            } else {
                response.tell(new Speech(Constants.SPEECH_TYPE_TEXT, Constants.ALEXA_MESSAGE_SERVER_ERROR));
            }
            callback();
        });
    };
};

let askIntentHandler = (event, response) => {
    return (callback) => {
        let accuOptions = {};

        accuOptions[Constants.JSON_KEY_URL] = Constants.URL_ACCUWEATHER;
        accuOptions[Constants.JSON_KEY_METHOD] = Constants.HTTP_METHOD_GET;

        request(accuOptions, (error, _response, body) => {
            body = JSON.parse(body)[0];
            let tags = [];
            let temperature = body.Temperature.Value;

            if (temperature < Constants.THRESHOLD_COLD) {
                tags.push(Constants.TAG_COLD);
            } else if (temperature < Constants.THRESHOLD_MODERATE) {
                tags.push(Constants.TAG_MODERATE);
            } else {
                tags.push(Constants.TAG_HOT);
            }

            if (body.PrecipitationProbability > Constants.THRESHOLD_PROBABILITY) {
                if (body.RainProbability > Constants.THRESHOLD_PROBABILITY) {
                    tags.push(Constants.TAG_RAIN);
                }
                if (body.SnowProbability > Constants.THRESHOLD_PROBABILITY || body.IceProbability > Constants.THRESHOLD_PROBABILITY) {
                    tags.push(Constants.TAG_SNOW);
                }
            }

            if (body.CloudCover < Constants.THRESHOLD_PROBABILITY) {
                tags.push(Constants.TAG_SUN);
            }

            let queryString = '';

            tags.forEach((tag, i) => {
                if (i > 0) {
                    queryString += ',';
                }
                queryString += '"' + tag + '"';
            });

            let options = {};

            options[Constants.JSON_KEY_URL] = format(Constants.URL_ASK, queryString);
            options[Constants.JSON_KEY_METHOD] = Constants.HTTP_METHOD_GET;

            request(options, (err, resp, bod) => {
                let item = JSON.parse(bod);
                if (!err && resp.statusCode === Constants.HTTP_RESPONSE_CODE_OK) {
                    response.tell(new Speech(Constants.SPEECH_TYPE_TEXT, format('You should wear your {0}.', item.name)));
                } else {
                    response.tell(new Speech(Constants.SPEECH_TYPE_TEXT, Constants.ALEXA_MESSAGE_SERVER_ERROR));
                }
                callback();
            });
        });
    };
};

let deleteIntentHandler = (event, response) => {
    let clothing = event.request.intent.slots.ClothingName.value;

    let json = {};
    json[Constants.CLOTHING_KEY_NAME] = clothing;

    let options = {
        json
    };

    options[Constants.JSON_KEY_URL] = Constants.URL_DELETE;
    options[Constants.JSON_KEY_METHOD] = Constants.HTTP_METHOD_POST;

    return (callback) => {
        request(options, (err, resp) => {
            if (!err && resp.statusCode === Constants.HTTP_RESPONSE_CODE_OK) {
                response.ask(new Speech(Constants.SPEECH_TYPE_TEXT, format(Constants.ALEXA_MESSAGE_DELETED, clothing)),
                    new Speech(Constants.SPEECH_TYPE_TEXT, Constants.ALEXA_MESSAGE_REPROMPT));
            } else {
                response.ask(new Speech(Constants.SPEECH_TYPE_TEXT, format(Constants.ALEXA_MESSAGE_NOT_FOUND, clothing)),
                    new Speech(Constants.SPEECH_TYPE_TEXT, Constants.ALEXA_MESSAGE_REPROMPT));
            }
            callback();
        });
    };
};

module.exports = CoatCheck;
