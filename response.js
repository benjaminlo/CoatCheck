'use strict';

const Constants = require('./constants.js');
const Speech = require('./speech.js');
const Card = require('./card.js');

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
}

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
     * should prompt the user with text-to-speech audio as specified in speech
     * and then wait for a response.
     * 
     * @this {Response}
     * @param {Speech} speech The speech object that will be sent to the skill
     * as the main text-to-speech audio.
     * @param {Speech} repromptSpeech The speech object that will be sent to the
     * skill as the reprompt text-to-speech audio.
     */
    ask (speech, repromptSpeech) {
        if (!(speech instanceof Speech) || !(repromptSpeech instanceof Speech)) {
            throw Constants.ERROR_MESSAGE_INVALID_TYPE;
        }

        this._context.succeed(buildSpeechletResponse({
            speech,
            reprompt: repromptSpeech,
            shouldEndSession: false
        }));
    }

    /**
     * Responds to the Alexa skill with a JSON object indicating that the echo
     * should prompt the user with text-to-speech audio as specified in speech
     * and display content as a card in the Alexa companion app and then wait
     * for a response.
     * 
     * @this {Response}
     * @param {Speech} speech The speech object that will be sent to the skill
     * as the main text-to-speech audio.
     * @param {Speech} repromptSpeech The speech object that will be sent to the
     * skill as the reprompt text-to-speech audio.
     * @param {Card} card The card object that will be sent to the skill.
     */
    askWithCard (speech, repromptSpeech, card) {
        if (!(speech instanceof Speech) || !(repromptSpeech instanceof Speech)) {
            throw Constants.ERROR_MESSAGE_INVALID_TYPE;
        }

        this._context.succeed(buildSpeechletResponse({
            speech,
            reprompt: repromptSpeech,
            card,
            shouldEndSession: false
        }));
    }

    /**
     * Responds to the Alexa skill with a JSON object indicating that the echo
     * should prompt the user with text-to-speech audio as specified in speech.
     * 
     * @this {Response}
     * @param {Speech} speech The speech object that will be sent to the skill.
     */
    tell (speech) {
        if (!(speech instanceof Speech)) {
            throw Constants.ERROR_MESSAGE_INVALID_TYPE;
        }

        this._context.succeed(buildSpeechletResponse({
            speech,
            shouldEndSession: true
        }));
    }

    /**
     * Responds to the Alexa skill with a JSON object indicating that the echo
     * should prompt the user with text-to-speech audio as specified in speech
     * and display content as a card in the Alexa companion app.
     *
     * @this {Response}
     * @param {Speech} speech The speech object that will be sent to the skill.
     * @param {Card} card The card object that will be sent to the skill.
     */
    tellWithCard (speech, card) {
        if (!(speech instanceof Speech) || !(card instanceof Card)) {
            throw Constants.ERROR_MESSAGE_INVALID_TYPE;
        }

        this._context.succeed(buildSpeechletResponse({
            speech,
            card,
            shouldEndSession: true
        }));
    }
}

module.exports = Response;
