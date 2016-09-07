'use strict';

const Constants = require('./constants.js');
const Response = require('./response.js');
const Speech = require('./speech.js');

let APP_ID;
let onLaunch = (response) => {
    throw 'Unimplemented launch handler.';
};
let handlers = {};
let audioHandlers = {};
let playbackHandlers = {};
let onSessionEnded = () => {
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
    let response = new Response(context, session);

    switch (event.request.type) {
        case Constants.REQUEST_TYPE_LAUNCH:
            onLaunch(response);
            break;
        case Constants.REQUEST_TYPE_INTENT:
            handleIntent(event, response);
            break;
        case Constants.REQUEST_TYPE_SESSION_ENDED:
            onSessionEnded();
            break;
        case Constants.REQUEST_TYPE_AUDIO_PLAYER_PLAYBACK_STARTED:
        case Constants.REQUEST_TYPE_AUDIO_PLAYER_PLAYBACK_FINISHED:
        case Constants.REQUEST_TYPE_AUDIO_PLAYER_PLAYBACK_STOPPED:
        case Constants.REQUEST_TYPE_AUDIO_PLAYER_PLAYBACK_NEARLY_FINISHED:
        case Constants.REQUEST_TYPE_AUDIO_PLAYER_PLAYBACK_FAILED:
            handleAudioPlayerRequest(event);
            break;
        case Constants.REQUEST_TYPE_PLAYBACK_CONTROLLER_NEXT_COMMAND_ISSUED:
        case Constants.REQUEST_TYPE_PLAYBACK_CONTROLLER_PAUSE_COMMAND_ISSUED:
        case Constants.REQUEST_TYPE_PLAYBACK_CONTROLLER_PLAY_COMMAND_ISSUED:
        case Constants.REQUEST_TYPE_PLAYBACK_CONTROLLER_PREVIOUS_COMMAND_ISSUED:
            handlePlaybackControllerRequest(event);
            break;
        default:
            throw `Request type ${event.request.type} not supported.`;
            break;
    }
}

/**
 * Checks if the custom intent callback function exists and if so, calls it.
 *
 * @param {Object} event The event object from exports.handler.
 * @param {Response} response The response object created in makeResponse.
 */
function handleIntent(event, response) {
    let callback = handlers[event.request.intent.name];
    if (callback) {
        callback(response);
    } else {
        throw `Intent ${event.request.intent.name} not supported.`;
    }
}

/**
 * Checks if the audio player request callback function exists and if so, calls it.
 *
 * @param {Object} event The event object from exports.handler.
 * @param {Response} response The response object created in makeResponse.
 */
function handleAudioPlayerRequest(event) {
    let callback = audioHandlers[event.request.type];
    if (callback) {
        callback(event);
    } else {
        throw `Audio Player request ${event.request.type} not supported.`;
    }
}

/**
 * Checks if the playback controller callback function exists and if so, calls it.
 *
 * @param {Object} event The event object from exports.handler.
 * @param {Response} response The response object created in makeResponse.
 */
function handlePlaybackControllerRequest(event) {
    let callback = playbackHandlers[event.request.type];
    if (callback) {
        callback(event);
    } else {
        throw `Playback Controller request ${event.request.type} not supported.`;
    }
}

module.exports = Alexa;
