'use strict';
let assert = require('assert');

const Constants = require('../alexa/constants.js');
const Speech = require('../alexa/speech.js');

describe('Speech', function () {
    describe('#constructor', function () {
        it('should have the correct values passed in', function () {
            let speech;

            speech = new Speech(Constants.SPEECH_TYPE_SSML, '<speak>foo bar</speak>');
            assert.equal(speech.text, undefined);

            speech = new Speech(Constants.SPEECH_TYPE_TEXT, 'foo bar');
            assert.equal(speech.ssml, undefined);
        });

        it('should throw if invalid type', function () {
            let speech;

            assert.throws(function () {
                speech = new Speech('foo', 'bar');
            });
        })
    });
});