'use strict';

const Constants = require('./constants.js');

/**
 * A Card object is used to create a valid JSON object that will be used to tell
 * Alexa to respond with a card object in the companion app.
 *
 * @example
 * let card = new Card('Today's Weather Report', 'Sunny!');
 */
class Card {

    /**
     * @this {Card}
     * @param {String} title The title to display on the card.
     * @param {String} text The text to display on the card.
     */
    constructor(title, text) {
        if (!(typeof title === Constants.TYPE_STRING || title instanceof String)) {
            throw Constants.ERROR_MESSAGE_INVALID_TYPE_TITLE;
        }

        if (!(typeof text === Constants.TYPE_STRING || text instanceof String)) {
            throw Constants.ERROR_MESSAGE_INVALID_TYPE_TEXT;
        }

        this.type = Constants.CARD_TYPE_SIMPLE;
        this.title = title;
        this.content = text;
    }
}

module.exports = Card;
