'use strict';

const Constants = require('./constants.js');

/**
 * A Speech object is used to create a valid JSON object that will be used to
 * tell Alexa to respond with a text-to-speech audio.
 */
class Speech {

    /**
     * @this {Speech}
     * @param {String} type The type of speech. This can either be `'SSML'` or
     * `'PlainText'`. Any other value, or null, will throw an error.
     * @param {String} text The text that is being said by the Alexa skill. If
     * the {@param type} is set to `'SSML'`, then be sure to use valid SSML
     * formatting including the surrounding `<speak>...</speak>` tags.
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
