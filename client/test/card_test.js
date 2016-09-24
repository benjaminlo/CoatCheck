'use strict';

let assert = require('assert');

const Card = require('../alexa/card.js');

describe('Card', function () {
    describe('#constructor', function () {
        it('should have the values passed in', function () {
            let title = 'foo';
            let text = 'bar';
            let card = new Card(title, text);

            assert.equal(card.title, title);
            assert.equal(card.content, text);
        });

        it('should throw if the title parameter is of the wrong type', function () {
            assert.throws(function () {
                new Card(5, 'foo');
            })
        });

        it('should throw if the text parameter is of the wrong type', function () {
            assert.throws(function () {
                new Card('foo', true);
            })
        });
    });
});