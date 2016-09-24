'use strict';

const Constants = require('../alexa/constants');
const Speech = require('../alexa/speech');

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
        intentHandlers[Constants.INTENT_ADD] = (event, response) => {
            response.tell(new Speech(Constants.SPEECH_TYPE_TEXT, 'hello. i received an add intent'));
        };
        intentHandlers[Constants.INTENT_ASK] = (event, response) => {
            response.tell(new Speech(Constants.SPEECH_TYPE_TEXT, 'hello. i received an ask intent'));
        };
        intentHandlers[Constants.INTENT_DELETE] = (event, response) => {
            response.tell(new Speech(Constants.SPEECH_TYPE_TEXT, 'hello. i received a delete intent'));
        };
        this._alexa.setIntentHandlers(intentHandlers);
    }

    /**
     * Create the lambda connection. Call this last.
     */
    createLambdaConnection() {
        this._alexa.createLambdaConnection(this._exports);
    }

}

module.exports = CoatCheck;