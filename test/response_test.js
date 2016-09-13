"use strict";
var assert = require('assert');

const Card = require('../alexa/card.js');
const Constants = require('../alexa/constants.js');
const Response = require('../alexa/response.js');
const Speech = require('../alexa/speech.js');

describe('Response', function() {
    describe('#constructor()', function() {
        var response;

        beforeEach(function() {
            response = new Response();
        });

        it('should have the proper properties at construction', function() {
            // check shouldEndSession
            assert.ok(response._response.response.shouldEndSession);

            // check version number
            assert.strictEqual(response._response.version, Constants.VERSION_NUMBER);

            // check directives
            assert.strictEqual(response._directives.constructor, Array);
            assert.strictEqual(response._directives.length, 0);

            // check speech
            assert.deepStrictEqual(response._response.response.outputSpeech, undefined);

            // check card
            assert.deepStrictEqual(response._response.response.card, undefined);
        });
    });

    describe('#tell()', function() {
        var response;

        beforeEach(function() {
            response = new Response();
        });

        it('should throw an error if the wrong parameter is passed in', function() {
            assert.throws(function() {
                response.tell();
            });

            assert.throws(function() {
                response.tell('Not a Speech type');
            });

            assert.throws(function() {
                response.tell(1.0);
            });

            assert.throws(function() {
                response.tell(false);
            });

            assert.throws(function() {
                response.tell(function () {
                    // do nothing
                });
            });

            assert.throws(function() {
                response.tell({});
            });
        });

        it('should have the proper properties after a `tell` with type PlainText', function() {
            var speechText = 'The quick brown fox jumps over the lazy dog.';
            var speech = new Speech(Constants.SPEECH_TYPE_TEXT, speechText);
            response.tell(speech);

            // check shouldEndSession
            assert.ok(response._response.response.shouldEndSession);

            // check version number
            assert.strictEqual(response._response.version, Constants.VERSION_NUMBER);

            // check directives
            assert.strictEqual(response._directives.constructor, Array);
            assert.strictEqual(response._directives.length, 0);

            // check speech
            assert.deepStrictEqual(response._response.response.outputSpeech, speech);

            // check card
            assert.deepStrictEqual(response._response.response.card, undefined);
        });

        it('should have the proper properties after a `tell` with type SSML', function() {
            var speechText = '<speak>The quick brown fox jumps over the lazy dog.</speak>';
            var speech = new Speech(Constants.SPEECH_TYPE_SSML, speechText);
            response.tell(speech);

            // check shouldEndSession
            assert.ok(response._response.response.shouldEndSession);

            // check version number
            assert.strictEqual(response._response.version, Constants.VERSION_NUMBER);

            // check directives
            assert.strictEqual(response._directives.constructor, Array);
            assert.strictEqual(response._directives.length, 0);

            // check speech
            assert.deepStrictEqual(response._response.response.outputSpeech, speech);

            // check card
            assert.deepStrictEqual(response._response.response.card, undefined);
        });
    });

    describe('#tellWithCard()', function() {
        var response;

        beforeEach(function() {
            response = new Response();
        });

        it('should throw an error if the wrong parameter is passed in', function() {
            var speech = new Speech(Constants.SPEECH_TYPE_TEXT, 'valid speech');
            var card = new Card('Valid', 'Card');

            assert.throws(function() {
                response.tellWithCard();
            });

            assert.throws(function() {
                response.tellWithCard(speech);
            });

            assert.throws(function() {
                response.tellWithCard(null, card);
            });

            assert.throws(function() {
                response.tellWithCard('Not a Speech type', card);
            });

            assert.throws(function() {
                response.tellWithCard(speech, 'Not a Card type');
            });

            assert.throws(function() {
                response.tellWithCard(1.0, card);
            });

            assert.throws(function() {
                response.tellWithCard(speech, 1.0);
            });

            assert.throws(function() {
                response.tellWithCard(false, card);
            });

            assert.throws(function() {
                response.tellWithCard(speech, false);
            });

            assert.throws(function() {
                response.tellWithCard(function () {
                    // do nothing
                }, card);
            });

            assert.throws(function() {
                response.tellWithCard(speech, function () {
                    // do nothing
                });
            });

            assert.throws(function() {
                response.tellWithCard({}, card);
            });

            assert.throws(function() {
                response.tellWithCard(speech, {});
            });

            assert.throws(function() {
                response.tellWithCard(card, speech);
            });
        });

        it('should have the proper properties after a `tellWithCard` with type PlainText', function() {
            var speech = new Speech(Constants.SPEECH_TYPE_TEXT, 'The quick brown fox jumps over the lazy dog.');
            var card = new Card('Valid', 'Card');

            response.tellWithCard(speech, card);

            // check shouldEndSession
            assert.ok(response._response.response.shouldEndSession);

            // check version number
            assert.strictEqual(response._response.version, Constants.VERSION_NUMBER);

            // check directives
            assert.strictEqual(response._directives.constructor, Array);
            assert.strictEqual(response._directives.length, 0);

            // check speech
            assert.deepStrictEqual(response._response.response.outputSpeech, speech);

            // check card
            assert.deepStrictEqual(response._response.response.card, card);
        });

        it('should have the proper properties after a `tellWithCard` with type SSML', function() {
            var speech = new Speech(Constants.SPEECH_TYPE_SSML, '<speak>The quick brown fox jumps over the lazy dog.</speak>');
            var card = new Card('Valid', 'Card');

            response.tellWithCard(speech, card);

            // check shouldEndSession
            assert.ok(response._response.response.shouldEndSession);

            // check version number
            assert.strictEqual(response._response.version, Constants.VERSION_NUMBER);

            // check directives
            assert.strictEqual(response._directives.constructor, Array);
            assert.strictEqual(response._directives.length, 0);

            // check speech
            assert.deepStrictEqual(response._response.response.outputSpeech, speech);

            // check card
            assert.deepStrictEqual(response._response.response.card, card);
        });
    });
});
