'use strict';

const Constants = require('./constants.js');

/**
 * A Card object is used to create a valid JSON object that will be used to tell
 * Alexa to respond with a card object in the companion app.
 */
class Card {

    /**
     * @this {Card}
     * @param {String} title The title to display on the card.
     * @param {String} text The text to display on the card.
     */
    constructor (title, text) {
        this.type = Constants.CARD_TYPE_SIMPLE;
        this.title = title;
        this.content = text;
    }
}

module.exports = Card;
