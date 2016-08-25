'use strict';

let Constants = require('./constants.js');
let Speech = require('./speech.js');

function buildSpeechletResponse (options) {
    let alexaResponse = {
        outputSpeech: options.speech,
        shouldEndSession: options.shouldEndSession
    };

    if (options.reprompt) {
        alexaResponse.reprompt = {
            outputSpeech: options.reprompt
        };
    }

    if (options.card) {
        alexaResponse.card = options.card;
    }

    let returnResult = {
        version: Constants.VERSION_NUMBER,
        response: alexaResponse
    };

    if (options.session && options.session.attributes) {
        returnResult.sessionAttributes = options.session.attributes;
    }

    return returnResult;
};

/**
 * A Response object is used to create a valid JSON response that will respond
 * to the Alexa skill.
 */
class Response {

    /**
     * @this {Response}
     * @param {Object} context The context passed in from Alexa.
     * @param {Object} session The session passed in from Alexa.
     */
    constructor (context, session) {
        this._context = context;
        this._session = session;
    }

    /**
     * Responds to the Alexa skill with a JSON object indicating that the echo
     * should prompt the user with text-to-speech audio as specified in
     * {@param speech}.
     * 
     * @this {Response}
     * @param {Speech} speech The speech object that will be sent to the skill.
     */
    tell (speech) {
        if (!(speech instanceof Speech)) {
            throw Constants.ERROR_MESSAGE_INVALID_TYPE;
        }

        this._context.succeed(buildSpeechletResponse({
            speech
        }));
    }
}

module.exports = Response;
