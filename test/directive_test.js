'use strict';
let assert = require('assert');

const Constants = require('../alexa/constants');
const Directive = require('../alexa/directive.js');

describe('Directive', function () {
    describe('#constructor()', function () {
        let directive;
        const context = {
            'foo': 'bar'
        };

        beforeEach(function () {
            directive = new Directive(context);
        });

        it('should have the proper properties at construction', function () {
            assert.equal(directive.context, context);
        });
    });

    describe('#setTypeToPlay(...)', function () {
        let directive;
        const context = {
            'foo': 'bar'
        };

        beforeEach(function () {
            directive = new Directive(context);
        });

        it('should throw if no parameters are passed in', function () {
            assert.throws(function () {
                directive.setTypeToPlay()
            });
        });

        it('should throw if the wrong parameters are passed in', function () {
            assert.throws(function () {
                directive.setTypeToPlay(true, 'url', 'token', 'previous', 5);
            });

            assert.throws(function () {
                directive.setTypeToPlay(Constants.PLAY_BEHAVIOR_ENQUEUE, 5, 'token', 'previous', 5);
            });

            assert.throws(function () {
                directive.setTypeToPlay(Constants.PLAY_BEHAVIOR_ENQUEUE, 'url', {}, 'previous', 5);
            });

            assert.throws(function () {
                directive.setTypeToPlay(Constants.PLAY_BEHAVIOR_ENQUEUE, 'url', 'token', null, 5);
            });

            assert.throws(function () {
                directive.setTypeToPlay(Constants.PLAY_BEHAVIOR_ENQUEUE, 'url', 'token', 'previous', '5');
            });
        });

        it('should not throw if the right parameter types are passed in', function () {
            directive.setTypeToPlay(Constants.PLAY_BEHAVIOR_ENQUEUE, 'url', 'token', 'previous', 5);
        });


        it('should not throw if the null is passed in as previous token when type is replace all', function () {
            directive.setTypeToPlay(Constants.PLAY_BEHAVIOR_REPLACE_ALL, 'url', 'token', null, 5);
        });

        it('should throw if the null is passed in as previous token when type is enqueue', function () {
            assert.throws(function () {
                directive.setTypeToPlay(Constants.PLAY_BEHAVIOR_ENQUEUE, 'url', 'token', null, 5);
            });

            assert.throws(function () {
                directive.setTypeToPlay(Constants.PLAY_BEHAVIOR_REPLACE_ENQUEUED, 'url', 'token', null, 5);
            });
        });
    });

    describe('#setTypeToStop', function () {
        it('should set the type to stop', function () {
            let directive = new Directive({});

            directive.setTypeToStop();

            assert.equal(directive.type, Constants.DIRECTIVE_TYPE_AUDIO_PLAYER_STOP);
        });
    });

    describe('#setTypeToClearQueue', function () {
        let directive;
        const context = {
            'foo': 'bar'
        };

        beforeEach(function () {
            directive = new Directive(context);
        });

        it('should should throw if the wrong parameter is passed in', function () {
            assert.throws(function () {
                directive.setTypeToClearQueue();
            });

            assert.throws(function () {
                directive.setTypeToClearQueue(5);
            });

            assert.throws(function () {
                directive.setTypeToClearQueue(Constants.DIRECTIVE_TYPE_AUDIO_PLAYER_STOP);
            });
        });

        it('should should set the directive type to clear queue', function () {
            directive.setTypeToClearQueue(Constants.CLEAR_BEHAVIOR_ENQUEUED);

            assert.equal(directive.type, Constants.DIRECTIVE_TYPE_AUDIO_PLAYER_CLEAR_QUEUE);
        });

        it('should should set the clearBehavior type to enqueued if passed in', function () {
            directive.setTypeToClearQueue(Constants.CLEAR_BEHAVIOR_ENQUEUED);

            assert.equal(directive.clearBehavior, Constants.CLEAR_BEHAVIOR_ENQUEUED);
        });

        it('should should set the clearBehavior type to all if passed in', function () {
            directive.setTypeToClearQueue(Constants.CLEAR_BEHAVIOR_ALL);

            assert.equal(directive.clearBehavior, Constants.CLEAR_BEHAVIOR_ALL);
        });
    });
});
