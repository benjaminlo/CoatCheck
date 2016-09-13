'use strict';

const Constants = require('./constants.js');
const Directive = require('./directive.js');
const Speech = require('./speech.js');
const Card = require('./card.js');

function buildSpeechletResponse(options) {
    let response = {
        shouldEndSession: options.shouldEndSession
    };

    if (options.speech) {
        response.outputSpeech = options.speech;
    }

    if (options.reprompt) {
        response.reprompt = {
            outputSpeech: options.reprompt
        };
    }

    if (options.card) {
        response.card = options.card;
    }

    let returnResult = {
        version: Constants.VERSION_NUMBER,
        response: response
    };

    if (options.session && options.session.attributes) {
        returnResult.sessionAttributes = options.session.attributes;
    }

    return returnResult;
}

/**
 * A Response object is used to create a valid JSON response that will respond to the Alexa skill.
 */
class Response {

    /**
     * @this Response
     */
    constructor() {
        this._response = {
            version: Constants.VERSION_NUMBER,
            response: {
                shouldEndSession: true
            }
        };
        this._directives = [];
    }

    /**
     * Responds to the Alexa skill with a JSON object indicating that the Echo should prompt the user with
     * text-to-speech audio as specified in speech and then wait for a response. This method cannot be used if
     * {@link #askWithCard}, {@link #tell}, {@link #tellWithCard}, or another {@link #ask} has already been called.
     * Note: If speech is not valid as part of a response to the event, it may be removed by the {@link Alexa} object
     * before the response is sent.
     *
     * @example
     * let question = new Speech(Constants.SPEECH_TYPE_TEXT, 'What can I do for you?');
     * let reprompt = new Speech(Constants.SPEECH_TYPE_TEXT, 'I did not hear a request. Is there anything I can do for you?');
     * response.ask(question, reprompt);
     *
     * @this Response
     * @param {Speech} speech The speech object that will be sent to the skill as the main text-to-speech audio.
     * @param {Speech} repromptSpeech The speech object that will be sent to the skill as the reprompt text-to-speech
     * audio.
     */
    ask(speech, repromptSpeech) {
        if (!(speech instanceof Speech) || !(repromptSpeech instanceof Speech)) {
            throw Constants.ERROR_MESSAGE_INVALID_TYPE;
        }

        this._response = buildSpeechletResponse({
            speech,
            reprompt: repromptSpeech,
            shouldEndSession: false
        });
    }

    /**
     * Responds to the Alexa skill with a JSON object indicating that the Echo should prompt the user with
     * text-to-speech audio as specified in speech and display content as a card in the Alexa companion app and then
     * wait for a response. This method cannot be used if {@link #ask}, {@link #tell}, {@link #tellWithCard}, or
     * another {@link #askWithCard} has already been called. Note: If speech or card are not valid as part of a response
     * to the event, they may be removed by the Alexa object before the response is sent.
     *
     * @example
     * let question = new Speech(Constants.SPEECH_TYPE_TEXT, 'What can I do for you?');
     * let reprompt = new Speech(Constants.SPEECH_TYPE_TEXT, 'I didn't hear a request. Is there anything I can do for you?');
     * let card = new Card('What Can I Do', 'I can do a lot for you!');
     * response.askWithCard(question, reprompt, card);
     *
     * @this Response
     * @param {Speech} speech The speech object that will be sent to the skill as the main text-to-speech audio.
     * @param {Speech} repromptSpeech The speech object that will be sent to the skill as the reprompt text-to-speech
     * audio.
     * @param {Card} card The card object that will be sent to the skill.
     */
    askWithCard(speech, repromptSpeech, card) {
        if (!(speech instanceof Speech) || !(repromptSpeech instanceof Speech)) {
            throw Constants.ERROR_MESSAGE_INVALID_TYPE;
        }

        this._response = buildSpeechletResponse({
            speech,
            reprompt: repromptSpeech,
            card,
            shouldEndSession: false
        });
    }

    /**
     * Responds to the Alexa skill with a JSON object indicating that the Echo should prompt the user with
     * text-to-speech audio as specified in speech. This method cannot be used if {@link #ask}, {@link #askWithCard},
     * {@link #tellWithCard}, or another {@link #tell} has already been called. Note: If speech is not valid as part of
     * a response to the event, it may be removed by the Alexa object before the response is sent.
     *
     * @example
     * let phrase = new Speech(Constants.SPEECH_TYPE_TEXT, 'It is sunny outside today.');
     * response.tell(phrase);
     *
     * @this Response
     * @param {Speech} speech The speech object that will be sent to the skill.
     */
    tell(speech) {
        if (!(speech instanceof Speech)) {
            throw Constants.ERROR_MESSAGE_INVALID_TYPE;
        }

        this._response = buildSpeechletResponse({
            speech,
            shouldEndSession: true
        });
    }

    /**
     * Responds to the Alexa skill with a JSON object indicating that the Echo should prompt the user with
     * text-to-speech audio as specified in speech and display content as a card in the Alexa companion app. This method
     * cannot be used if {@link #ask}, {@link #askWithCard}, {@link #tell}, or another {@link #tellWithCard} has already
     * been called. Note: If speech or card are not valid as part of a response to the event, they may be removed by the
     * Alexa object before the response is sent.
     *
     * @example
     * let phrase = new Speech(Constants.SPEECH_TYPE_TEXT, 'It is sunny outside today.');
     * let card = new Card('Today's Weather Report', 'Sunny!');
     * response.tellWithCard(phrase, card);
     *
     * @this Response
     * @param {Speech} speech The speech object that will be sent to the skill.
     * @param {Card} card The card object that will be sent to the skill.
     */
    tellWithCard(speech, card) {
        if (!(speech instanceof Speech) || !(card instanceof Card)) {
            throw Constants.ERROR_MESSAGE_INVALID_TYPE;
        }

        this._response = buildSpeechletResponse({
            speech,
            card,
            shouldEndSession: true
        });
    }

    /**
     * Adds a Directive object to this response. Note: If the directive object is not valid as part of a response to the
     * event, it may be removed by the Alexa object before the response is sent.
     *
     * @example
     * let directive = new Directive(context);
     * response.addDirective(directive);
     *
     * @this Response
     * @param {Directive} directive The directive to add to the Response object.
     */
    addDirective(directive) {
        if (!(directive instanceof Directive)) {
            throw Constants.ERROR_MESSAGE_INVALID_TYPE;
        }

        this._directives.push(directive);
    }

    /**
     * Removes all the invalid directives. A {@link Directive} is valid only if it is the only one of its type, and if it is
     * passed in as this method's parameter.
     *
     * @param {Array} validDirectives The list of {@link Directive} types that are valid. This can either be
     * {@link Constants.DIRECTIVE_TYPE_AUDIO_PLAYER_PLAY}, {@link Constants.DIRECTIVE_TYPE_AUDIO_PLAYER_STOP}, or
     * {@link Constants.DIRECTIVE_TYPE_AUDIO_PLAYER_CLEAR_QUEUE}. Any Directives of any other type will be removed.
     */
    filterDirectives(validDirectives) {
        if (validDirectives.constructor !== Array) {
            throw Constants.ERROR_MESSAGE_INVALID_TYPE_FILTER_DIRECTIVES;
        }

        let didFindPlay = false;
        let didFindStop = false;
        let didFindClearQueue = false;

        this._directives = this._directives.filter((directive) => {
            let isValid = false;

            validDirectives.forEach(check => {
                if (check === directive.type) {
                    if (directive.type === Constants.DIRECTIVE_TYPE_AUDIO_PLAYER_PLAY && !didFindPlay) {
                        didFindPlay = true;
                        isValid = true;
                    } else if (directive.type === Constants.DIRECTIVE_TYPE_AUDIO_PLAYER_STOP && !didFindStop) {
                        didFindStop = true;
                        isValid = true;
                    } else if (directive.type === Constants.DIRECTIVE_TYPE_AUDIO_PLAYER_CLEAR_QUEUE && !didFindClearQueue) {
                        didFindClearQueue = true;
                        isValid = true;
                    }
                }
            });

            return isValid;
        });
    }

    /**
     * Removes the speechlet response.
     */
    removeSpeech() {
        delete this._response.speech;
    }

    /**
     * Removes the reprompt speechlet response.
     */
    removeReprompt() {
        delete this._response.reprompt;
    }

    /**
     * Removes the card response.
     */
    removeCard() {
        delete this._response.card;
    }
}

module.exports = Response;
