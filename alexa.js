'use strict';

const Constants = require('./constants.js');
const Directive = require('./directive.js');
const Response = require('./response.js');
const Speech = require('./speech.js');

let APP_ID;
let onLaunch = (response, event, context, session) => {
    throw 'Unimplemented launch handler.';
};
let handlers = {};
let audioHandlers = {};
let playbackHandlers = {};
let onSessionEnded = (event, context, session) => {
    throw 'Unimplemented session ended handler.';
};

/**
 * An Alexa object is used to handle custom intents and requests to an Alexa skill.
 */
class Alexa {

    /**
     * @this {Alexa}
     * @param {string} appId The ID of the application.
     */
    constructor (appId) {
        APP_ID = appId;
    }

    /**
     * This is required if you want your skill to listen and send responses on Lambda.
     *
     * @this {Alexa}
     * @param {Object} exports The variable to export the Lambda handler to.
     * @returns {Alexa} Returns itself to allow method chaining.
     */
    createLambdaConnection (exports) {
        exports.handler = (event, context, callback) => {
            let applicationId;
            let session;

            if (!event) {
                event = {};
            }

            if (event.session) {
                session = event.session;
                applicationId = session.application.applicationId;
            } else {
                session = {};
                applicationId = event.context.System.application.applicationId;
            }

            try {
                validateAppId(applicationId);
                makeResponse(event, context, session);
            } catch (err) {
                console.log(err);
            }
        };
        return this;
    }

    /**
     * This is required if you want your skill to reply to the user when they open your skill without a command.
     *
     * @this {Alexa}
     * @param {function} launchHandler The custom launch callback to be executed.
     * @returns {Alexa} Returns itself to allow method chaining.
     */
    setLaunchHandler (launchHandler) {
        onLaunch = launchHandler;
        return this;
    }

    /**
     * This is required if you want your skill to reply to the user when they give your skill commands.
     *
     * @this {Alexa}
     * @param {Object} intentHandlers The custom intent callbacks to be executed. In a dictionary where the name of the
     * intent is the key and the callback is the value.
     * @returns {Alexa} Returns itself to allow method chaining.
     */
    setIntentHandlers (intentHandlers) {
        handlers = intentHandlers;
        return this;
    }

    /**
     * This is required if you want your skill to run logic after the session has ended.
     *
     * @this {Alexa}
     * @param {function} sessionEndedHandler The custom session ended callback to be executed.
     * @returns {Alexa} Returns itself to allow method chaining.
     */
    setSessionEndedHandler (sessionEndedHandler) {
        onSessionEnded = sessionEndedHandler;
        return this;
    }

    /**
     * This is required if you want your skill to run logic after receiving an audio player request.
     *
     * @this {Alexa}
     * @param {Object} audioPlayerHandlers The custom audio player callbacks to be executed. In a dictionary where the
     * name of the request type is the key and the callback is the value.
     * @returns {Alexa} Returns itself to allow method chaining.
     */
    setAudioPlayerHandlers (audioPlayerHandlers) {
        audioHandlers = audioPlayerHandlers;
        return this;
    }

    /**
     * This is required if you want your skill to run logic after receiving a playback controller request.
     *
     * @this {Alexa}
     * @param {Object} playbackControllerHandlers The custom playback controller callbacks to be executed. In a
     * dictionary where the name of the request type is the key and the callback is the value.
     * @returns {Alexa} Returns itself to allow method chaining.
     */
    setPlaybackControllerHandlers (playbackControllerHandlers) {
        playbackHandlers = playbackControllerHandlers;
        return this;
    }
}

/**
 * Verifies that the request is intended for your service by checking that APP_ID (the application ID from the
 * constructor) is the same as appId (the application ID from exports.handler).
 *
 * @param {string} appId The application ID from exports.handler.
 */
function validateAppId (appId) {
    if (APP_ID && APP_ID !== '' && APP_ID !== appId) {
        console.log(Constants.ERROR_MESSAGE_INVALID_APP_ID_MSG
            + Constants.CONSTANTS_NEW_LINE + Constants.MESSAGE_EXPECTED + APP_ID
            + Constants.CONSTANTS_NEW_LINE + Constants.MESSAGE_ACTUAL + appId);

        throw Constants.ERROR_MESSAGE_INVALID_APP_ID;
    }
}

/**
 * Responds to a request made to an Alexa skill based on the request type (LaunchRequest, IntentRequest, and
 * SessionEndedRequest required).
 *
 * @param {Object} event The event object from exports.handler.
 * @param {Object} context The context passed in from Alexa.
 * @param {Object} session The session passed in from Alexa.
 */
function makeResponse(event, context, session) {
    switch (event.request.type) {
        case Constants.REQUEST_TYPE_LAUNCH:
            handleLaunch(event, context, session);
            break;
        case Constants.REQUEST_TYPE_INTENT:
            handleIntent(event, context, session);
            break;
        case Constants.REQUEST_TYPE_SESSION_ENDED:
            onSessionEnded(event, context, session);
            break;
        case Constants.REQUEST_TYPE_AUDIO_PLAYER_PLAYBACK_STARTED:
        case Constants.REQUEST_TYPE_AUDIO_PLAYER_PLAYBACK_FINISHED:
            handleAudioPlayerRequestWithStopOrClear(event, context, session);
            break;
        case Constants.REQUEST_TYPE_AUDIO_PLAYER_PLAYBACK_STOPPED:
            handleAudioPlayerRequestWithNoResponse(event, context, session);
            break;
        case Constants.REQUEST_TYPE_AUDIO_PLAYER_PLAYBACK_NEARLY_FINISHED:
        case Constants.REQUEST_TYPE_AUDIO_PLAYER_PLAYBACK_FAILED:
            handleAudioPlayerRequest(event, context, session);
            break;
        case Constants.REQUEST_TYPE_PLAYBACK_CONTROLLER_NEXT_COMMAND_ISSUED:
        case Constants.REQUEST_TYPE_PLAYBACK_CONTROLLER_PAUSE_COMMAND_ISSUED:
        case Constants.REQUEST_TYPE_PLAYBACK_CONTROLLER_PLAY_COMMAND_ISSUED:
        case Constants.REQUEST_TYPE_PLAYBACK_CONTROLLER_PREVIOUS_COMMAND_ISSUED:
            handlePlaybackControllerRequest(event, context, session);
            break;
        default:
            throw `Request type ${event.request.type} not supported.`;
            break;
    }
}

/**
 * Wraps launch event callback.
 *
 * @param {Object} event The event object from exports.handler.
 * @param {Object} context The context passed in from Alexa.
 * @param {Object} session The session passed in from Alexa.
 */
function handleLaunch(event, context, session) {
    let response = onLaunch(new Response(), event, context, session);

    response.filterDirectives([
        Constants.DIRECTIVE_TYPE_AUDIO_PLAYER_PLAY,
        Constants.DIRECTIVE_TYPE_AUDIO_PLAYER_STOP,
        Constants.DIRECTIVE_TYPE_AUDIO_PLAYER_CLEAR_QUEUE
    ]);

    context.succeed(response);
}

/**
 * Checks if the custom intent callback function exists and if so, calls it.
 *
 * @param {Object} event The event object from exports.handler.
 * @param {Object} context The context passed in from Alexa.
 * @param {Object} session The session passed in from Alexa.
 */
function handleIntent(event, context, session) {
    let response = new Response();
    let callback = handlers[event.request.intent.name];

    if (callback) {
        response = callback(response, event, context, session);
    } else {
        throw `Intent ${event.request.intent.name} not supported.`;
    }

    response.filterDirectives([
        Constants.DIRECTIVE_TYPE_AUDIO_PLAYER_PLAY,
        Constants.DIRECTIVE_TYPE_AUDIO_PLAYER_STOP,
        Constants.DIRECTIVE_TYPE_AUDIO_PLAYER_CLEAR_QUEUE
    ]);

    context.succeed(response._response);
}

/**
 * Wraps session ended event callback.
 *
 * @param {Object} event The event object from exports.handler.
 * @param {Object} context The context passed in from Alexa.
 * @param {Object} session The session passed in from Alexa.
 */
function handleSessionEnded(event, context, session) {
    onSessionEnded(event, context, session);
}

/**
 * Checks if the audio player request callback function exists and if so, calls it. Then it removes any invalid
 * directives, speech properties, reprompt properties, or card properties. Finally it sends the response back to the
 * skill.
 *
 * @param {Object} event The event object from exports.handler.
 * @param {Object} context The context passed in from Alexa.
 * @param {Object} session The session passed in from Alexa.
 */
function handleAudioPlayerRequestWithStopOrClear(event, context, session) {
    let response = new Response();
    let callback = audioHandlers[event.request.type];

    if (callback) {
        response = callback(response, event, context, session);
    } else {
        throw `Audio Player request ${event.request.type} not supported.`;
    }

    response.filterDirectives([
        Constants.DIRECTIVE_TYPE_AUDIO_PLAYER_STOP,
        Constants.DIRECTIVE_TYPE_AUDIO_PLAYER_CLEAR_QUEUE
    ]);
    response.removeSpeech();
    response.removeReprompt();
    response.removeCard();

    context.succeed(response._response);
}

/**
 * Checks if the audio player request callback function exists and if so, calls it. This makes no response to the skill.
 *
 * @param {Object} event The event object from exports.handler.
 * @param {Object} context The context passed in from Alexa.
 * @param {Object} session The session passed in from Alexa.
 */
function handleAudioPlayerRequestWithNoResponse(event, context, session) {
    let callback = audioHandlers[event.request.type];
    if (callback) {
        callback(event, context, session);
    } else {
        throw `Audio Player request ${event.request.type} not supported.`;
    }
}

/**
 * Checks if the audio player request callback function exists and if so, calls it. Then it removes any invalid
 * speech properties, reprompt properties, or card properties. Finally it sends the response back to the skill.
 *
 * @param {Object} event The event object from exports.handler.
 * @param {Object} context The context passed in from Alexa.
 * @param {Object} session The session passed in from Alexa.
 */
function handleAudioPlayerRequest(event, context, session) {
    let response = new Response();
    let callback = audioHandlers[event.request.type];
    if (callback) {
        response = callback(response, event, context, session);
    } else {
        throw `Audio Player request ${event.request.type} not supported.`;
    }

    response.filterDirectives([
        Constants.DIRECTIVE_TYPE_AUDIO_PLAYER_PLAY,
        Constants.DIRECTIVE_TYPE_AUDIO_PLAYER_STOP,
        Constants.DIRECTIVE_TYPE_AUDIO_PLAYER_CLEAR_QUEUE
    ]);
    response.removeSpeech();
    response.removeReprompt();
    response.removeCard();

    context.succeed(response._response);
}

/**
 * Checks if the playback controller callback function exists and if so, calls it.
 *
 * @param {Object} event The event object from exports.handler.
 */
function handlePlaybackControllerRequest(event) {
    let callback = playbackHandlers[event.request.type];
    if (callback) {
        callback(event, directive);
    } else {
        throw `Playback Controller request ${event.request.type} not supported.`;
    }
}

module.exports = Alexa;
