'use strict';
const Constants = require('./constants.js');

/**
 * A Directive object is used to create a valid JSON property for a Response object that will tell a client to perform
 * a certain action.
 *
 * @example
 * let directive = new Directive(context);
 */
class Directive {

    /**
     * @this Directive
     * @param {Object} context The context passed in from Alexa.
     */
    constructor (context) {
        this.context = context;
    }

    /**
     * Configures the Directive object to represent a Play Directive. Validates the input and creates a new Audio Item
     * property in the response so that an audio stream can be played.
     *
     * @this Directive
     * @param {string} playBehavior The playBehavior must be Constants.PLAY_BEHAVIOR_REPLACE_ALL,
     * Constants.PLAY_BEHAVIOR_ENQUEUE, or Constants.PLAY_BEHAVIOR_REPLACE_ENQUEUED.
     * @param {string} url The url of the audio stream.
     * @param {string} token The token that represents the audio stream.
     * @param {string} expectedPreviousToken The token that represents the expected previous stream.
     * @param {number} offsetInMilliseconds The offset in milliseconds in the stream from which Alexa should begin
     * playback.
     */
    setTypeToPlay (playBehavior, url, token, expectedPreviousToken, offsetInMilliseconds) {
        this.type = Constants.DIRECTIVE_TYPE_AUDIO_PLAYER_PLAY;
        if (playBehavior === Constants.PLAY_BEHAVIOR_REPLACE_ALL ||
            playBehavior === Constants.PLAY_BEHAVIOR_ENQUEUE ||
            playBehavior === Constants.PLAY_BEHAVIOR_REPLACE_ENQUEUED) {
            this.playBehavior = playBehavior;
        } else {
            throw Constants.ERROR_MESSAGE_INVALID_PLAY_BEHAVIOR;
        }

        if (!(typeof url === Constants.TYPE_STRING || url instanceof String))
            throw Constants.ERROR_MESSAGE_INVALID_TYPE_URL;
        if (!(typeof token === Constants.TYPE_STRING || token instanceof String))
            throw Constants.ERROR_MESSAGE_INVALID_TYPE_TOKEN;
        if (!(typeof expectedPreviousToken === Constants.TYPE_STRING || expectedPreviousToken instanceof String))
            throw Constants.ERROR_MESSAGE_INVALID_TYPE_EXPECTED_PREVIOUS_TOKEN;
        if (!(!isNaN(parseFloat(offsetInMilliseconds)) && isFinite(offsetInMilliseconds)))
            throw Constants.ERROR_MESSAGE_INVALID_TYPE_OFFSET_IN_MILLISECONDS;

        this.audioItem = {
            stream: {
                url,
                token,
                expectedPreviousToken,
                offsetInMilliseconds
            }
        };
    }

    /**
     * Configures the Directive object to represent a Stop Directive.
     *
     * @this Directive
     */
    setTypeToStop () {
        this.type = Constants.DIRECTIVE_TYPE_AUDIO_PLAYER_STOP;
    }

    /**
     * Configures the Directive object to represent a Clear Queue Directive and validates the input.
     *
     * @this Directive
     * @param {string} clearBehavior The clearBehavior must be Constants.CLEAR_BEHAVIOR_ENQUEUED or
     * Constants.CLEAR_BEHAVIOR_ALL.
     */
    setTypeToClearQueue (clearBehavior) {
        this.type = Constants.DIRECTIVE_TYPE_AUDIO_PLAYER_CLEAR_QUEUE;
        if (clearBehavior === Constants.CLEAR_BEHAVIOR_ENQUEUED || clearBehavior === Constants.CLEAR_BEHAVIOR_ALL) {
            this.clearBehavior = clearBehavior;
        } else {
            throw Constants.ERROR_MESSAGE_INVALID_CLEAR_BEHAVIOR;
        }
    }

    /**
     * Configures the Directive object to be added to the Response object.
     *
     * @this Directive
     * @returns {Object} directive The directive to add to the Response object.
     */
    parse () {
        let directive = {};
        directive[Constants.DIRECTIVE_PROPERTY_TYPE] = this.type;

        if (this.audioItem) {
            directive[Constants.DIRECTIVE_PROPERTY_PLAY_BEHAVIOR] = this.playBehavior;
            directive[Constants.DIRECTIVE_PROPERTY_AUDIO_ITEM] = this.audioItem;
        } else if (this.clearBehavior) {
            directive[Constants.DIRECTIVE_PROPERTY_CLEAR_BEHAVIOR] = this.clearBehavior;
        }

        return directive;
    }
}

module.exports = Directive;
