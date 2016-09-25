'use strict';

const Constants = require('../alexa/constants.js');
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
            response.ask(new Speech(Constants.SPEECH_TYPE_TEXT, 'Opening your closet. What do you want?'),
                new Speech(Constants.SPEECH_TYPE_TEXT, 'Yo. I asked what you wanted.'));
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

    let options = {
        'url': Constants.URL_ADD,
        'method': Constants.HTTP_METHOD_POST,
        json
    };

    return (callback) => {
        request(options, (err, resp) => {
            if (!err && resp.statusCode === Constants.HTTP_RESPONSE_CODE_OK) {
                response.tell(new Speech(Constants.SPEECH_TYPE_TEXT, `I added ${clothing} to your closet.`));
            } else {
                response.tell(new Speech(Constants.SPEECH_TYPE_TEXT, `I had an issue communicating with your closet.`));
            }
            callback();
        });
    };
};

let askIntentHandler = (event, response) => {
    return (callback) => {
        let accuOptions = {
            'url': Constants.URL_ACCUWEATHER,
            'method': Constants.HTTP_METHOD_GET
        };

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

            let options = {
                'url': Constants.URL_ASK + '?tags=[' + queryString + ']',
                'method': Constants.HTTP_METHOD_GET
            };

            request(options, (err, resp, bod) => {
                let item = JSON.parse(bod);
                if (!err && resp.statusCode === Constants.HTTP_RESPONSE_CODE_OK) {
                    response.tell(new Speech(Constants.SPEECH_TYPE_TEXT, `You should wear your ${item.name}.`));
                } else {
                    response.tell(new Speech(Constants.SPEECH_TYPE_TEXT, `I had an issue communicating with your closet.`));
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
        'url': Constants.URL_DELETE,
        'method': Constants.HTTP_METHOD_POST,
        json
    };

    return (callback) => {
        request(options, (err, resp) => {
            if (!err && resp.statusCode === Constants.HTTP_RESPONSE_CODE_OK) {
                response.ask(new Speech(Constants.SPEECH_TYPE_TEXT, `${clothing} has been removed from your closet. What else would you like to do?`),
                    new Speech(Constants.SPEECH_TYPE_TEXT, `I didn't quite catch that. What would you like to do?`));
            } else {
                response.ask(new Speech(Constants.SPEECH_TYPE_TEXT, `I'm sorry, I could not find ${clothing} in your closet. Please try again. What else would you like to do`),
                    new Speech(Constants.SPEECH_TYPE_TEXT, `I didn't quite catch that. What would you like to do?`));
            }
            callback();
        });
    };
};

module.exports = CoatCheck;
