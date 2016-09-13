'use strict';

const Constants = require('./constants.js');

/**
 * A Speech object is used to create a valid JSON object that will be used to
 * tell Alexa to respond with a text-to-speech audio.
 *
 * @example
 * let phrase = new Speech(`Constants.SPEECH_TYPE_TEXT`, 'It is sunny outside today.');
 */
class Speech {

    /**
     * @this {Speech}
     * @param {String} type The type of speech. This can either be {@link Constants.SPEECH_TYPE_SSML} or
     * {@link Constants.SPEECH_TYPE_TEXT}. Any other value, or null, will throw an error.
     * @param {String} text The text that is being said by the Alexa skill. If the type is set to
     * {@link Constants.SPEECH_TYPE_SSML}, then be sure to use valid SSML formatting including the surrounding
     * <code>&lt;speak&gt;</code> and <code>&lt;/speak&gt;</code> tags.
     */
    constructor (type, text) {
        switch (type) {
            case Constants.SPEECH_TYPE_SSML:
                this.ssml = text;
                break;
            case Constants.SPEECH_TYPE_TEXT:
                this.text = text;
                break;
            default:
                throw Constants.ERROR_MESSAGE_INVALID_TYPE;
                break;
        }

        this.type = type;
    }
}

module.exports = Speech;
