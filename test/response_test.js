'use strict';
let assert = require('assert');

const Card = require('../alexa/card.js');
const Constants = require('../alexa/constants.js');
const Directive = require('../alexa/directive.js');
const Response = require('../alexa/response.js');
const Speech = require('../alexa/speech.js');

describe('Response', function () {
    describe('#constructor()', function () {
        let response;

        beforeEach(function () {
            response = new Response();
        });

        it('should have the proper properties at construction', function () {
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

    describe('#tell()', function () {
        let response;

        beforeEach(function () {
            response = new Response();
        });

        it('should throw an error if the wrong parameter is passed in', function () {
            assert.throws(function () {
                response.tell();
            });

            assert.throws(function () {
                response.tell('Not a Speech type');
            });

            assert.throws(function () {
                response.tell(1.0);
            });

            assert.throws(function () {
                response.tell(false);
            });

            assert.throws(function () {
                response.tell(function () {
                    // do nothing
                });
            });

            assert.throws(function () {
                response.tell({});
            });
        });

        it('should have the proper properties after a `tell` with type PlainText', function () {
            let speechText = 'The quick brown fox jumps over the lazy dog.';
            let speech = new Speech(Constants.SPEECH_TYPE_TEXT, speechText);
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

        it('should have the proper properties after a `tell` with type SSML', function () {
            let speechText = '<speak>The quick brown fox jumps over the lazy dog.</speak>';
            let speech = new Speech(Constants.SPEECH_TYPE_SSML, speechText);
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

    describe('#tellWithCard()', function () {
        let response;

        beforeEach(function () {
            response = new Response();
        });

        it('should throw an error if the wrong parameter is passed in', function () {
            let speech = new Speech(Constants.SPEECH_TYPE_TEXT, 'valid speech');
            let card = new Card('Valid', 'Card');

            assert.throws(function () {
                response.tellWithCard();
            });

            assert.throws(function () {
                response.tellWithCard(speech);
            });

            assert.throws(function () {
                response.tellWithCard(null, card);
            });

            assert.throws(function () {
                response.tellWithCard('Not a Speech type', card);
            });

            assert.throws(function () {
                response.tellWithCard(speech, 'Not a Card type');
            });

            assert.throws(function () {
                response.tellWithCard(1.0, card);
            });

            assert.throws(function () {
                response.tellWithCard(speech, 1.0);
            });

            assert.throws(function () {
                response.tellWithCard(false, card);
            });

            assert.throws(function () {
                response.tellWithCard(speech, false);
            });

            assert.throws(function () {
                response.tellWithCard(function () {
                    // do nothing
                }, card);
            });

            assert.throws(function () {
                response.tellWithCard(speech, function () {
                    // do nothing
                });
            });

            assert.throws(function () {
                response.tellWithCard({}, card);
            });

            assert.throws(function () {
                response.tellWithCard(speech, {});
            });

            assert.throws(function () {
                response.tellWithCard(card, speech);
            });
        });

        it('should have the proper properties after a `tellWithCard` with type PlainText', function () {
            let speech = new Speech(Constants.SPEECH_TYPE_TEXT, 'The quick brown fox jumps over the lazy dog.');
            let card = new Card('Valid', 'Card');

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

        it('should have the proper properties after a `tellWithCard` with type SSML', function () {
            let speech = new Speech(Constants.SPEECH_TYPE_SSML, '<speak>The quick brown fox jumps over the lazy dog.</speak>');
            let card = new Card('Valid', 'Card');

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

    describe('addDirectives', function () {
        let response;

        beforeEach(function () {
            response = new Response();
        });

        it('should throw if a non-directive object is added', function () {
            let nonDirective = {
                'foo': 'bar'
            };

            assert.throws(function () {
                response.addDirective(nonDirective);
            });
        });

        it('should only have one of each type of directive after being filtered', function () {
            let playBehavior = Constants.PLAY_BEHAVIOR_REPLACE_ALL;
            let url = 'http://foobar.com';
            let token = 'my_token';
            let expectedPreviousToken = null;
            let offsetInMilliseconds = 0;
            let firstPlayDirective = new Directive()
                .setTypeToPlay(playBehavior, url, token, expectedPreviousToken, offsetInMilliseconds);
            let secondPlayDirective = new Directive()
                .setTypeToPlay(playBehavior, url, token, expectedPreviousToken, offsetInMilliseconds);

            let firstStopDirective = new Directive()
                .setTypeToStop();
            let secondStopDirective = new Directive()
                .setTypeToStop();

            let clearBehavior = Constants.CLEAR_BEHAVIOR_ALL;
            let firstClearQueueDirective = new Directive()
                .setTypeToClearQueue(clearBehavior);
            let secondClearQueueDirective = new Directive()
                .setTypeToClearQueue(clearBehavior);

            response.addDirective(firstPlayDirective);
            response.addDirective(secondPlayDirective);
            response.addDirective(firstStopDirective);
            response.addDirective(secondStopDirective);
            response.addDirective(firstClearQueueDirective);
            response.addDirective(secondClearQueueDirective);

            let validDirectives = [
                Constants.DIRECTIVE_TYPE_AUDIO_PLAYER_PLAY,
                Constants.DIRECTIVE_TYPE_AUDIO_PLAYER_STOP,
                Constants.DIRECTIVE_TYPE_AUDIO_PLAYER_CLEAR_QUEUE
            ];

            response.filterDirectives(validDirectives);

            assert.equal(response._directives.length, 3);

            let foundPlay = false;
            let foundStop = false;
            let foundClearQueue = false;

            response._directives.forEach(directive => {
                if (directive.type === Constants.DIRECTIVE_TYPE_AUDIO_PLAYER_PLAY) {
                    foundPlay = true;
                } else if (directive.type === Constants.DIRECTIVE_TYPE_AUDIO_PLAYER_STOP) {
                    foundStop = true;
                } else if (directive.type === Constants.DIRECTIVE_TYPE_AUDIO_PLAYER_CLEAR_QUEUE) {
                    foundClearQueue = true;
                }
            });

            assert.ok(foundPlay);
            assert.ok(foundStop);
            assert.ok(foundClearQueue);
        });
    });

    describe('#parse', function () {
        let directive;

        beforeEach(function () {
            directive = new Directive();
        });

        it('should be of the correct type if set to type play', function () {
            let playBehavior = Constants.PLAY_BEHAVIOR_REPLACE_ALL;
            let url = 'http://foobar.com';
            let token = 'my_token';
            let expectedPreviousToken = null;
            let offsetInMilliseconds = 0;
            directive.setTypeToPlay(playBehavior, url, token, expectedPreviousToken, offsetInMilliseconds);

            let parsedDirective = directive.parse();

            assert.equal(parsedDirective[Constants.DIRECTIVE_PROPERTY_TYPE], Constants.DIRECTIVE_TYPE_AUDIO_PLAYER_PLAY);
        });

        it('should be of the correct type if set to type stop', function () {
            directive.setTypeToStop();

            let parsedDirective = directive.parse();

            assert.equal(parsedDirective[Constants.DIRECTIVE_PROPERTY_TYPE], Constants.DIRECTIVE_TYPE_AUDIO_PLAYER_STOP);
        });

        it('should be of the correct type if set to type clear queue', function () {
            directive.setTypeToClearQueue(Constants.CLEAR_BEHAVIOR_ENQUEUED);

            let parsedDirective = directive.parse();

            assert.equal(parsedDirective[Constants.DIRECTIVE_PROPERTY_TYPE], Constants.DIRECTIVE_TYPE_AUDIO_PLAYER_CLEAR_QUEUE);
        });
    });
});
