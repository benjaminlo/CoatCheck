'use strict';

const Constants = require('./constants.js');
const Response = require('./response.js');

let APP_ID;
let onLaunch = (event, response) => {
    throw 'Unimplemented launch handler.';
};
let handlers = {};
let audioHandlers = {};
let playbackHandlers = {};
let exceptionHandler = (event) => {
    throw 'Unimplemented system exception handler.';
};
let onSessionEnded = (event) => {
    throw 'Unimplemented session ended handler.';
};

/**
 * An Alexa object is used to handle custom intents and requests to an Alexa skill.
 */
class Alexa {

    /**
     * @this Alexa
     * @param {string} appId The Application ID that you can find on the Alexa Skill dashboard in the following format:
     * <code>'amzn1.echo-sdk.amz-.app.[your-unique-value-here]'</code>.
     */
    constructor(appId) {
        APP_ID = appId;
    }

    /**
     * This is required if you want your skill to listen and send responses on Lambda.
     *
     * @this Alexa
     * @param {Object} exports The exports variable to set the Lambda handler onto.
     * @returns {Alexa} Returns itself to allow method chaining.
     */
    createLambdaConnection(exports) {
        exports.handler = (event, context, callback) => {
            let applicationId;

            if (!event) {
                event = {};
            }

            if (event.session) {
                applicationId = event.session.application.applicationId;
            } else {
                applicationId = event.context.System.application.applicationId;
            }

            try {
                validateAppId(applicationId);
                makeResponse(event, context, callback);
            } catch (err) {
                context.callbackWaitsForEmptyEventLoop = false;
                callback(err);
            }
        };
        return this;
    }

    /**
     * The custom launch callback to be executed is passed to this method. This is required if you want your skill to
     * reply to the user when they open your skill without a command.
     * <br />
     * The launch callback will run when the skill launches without a command.
     * It will be provided a {@link Response} object that you can use to respond to the user, as well as an event so
     * that your skill can grab data from ite.
     *
     * @example
     * let launchHandler = (event, response) => {
     *   response.ask(new Speech(Constants.SPEECH_TYPE_SSML, '<speak>Replace this with a launch menu.</speak>'),
     *     new Speech(Constants.SPEECH_TYPE_SSML, '<speak>Replace this with reprompt text.</speak>'));
     * }
     *
     * setLaunchHandler (launchHandler);
     *
     * @this Alexa
     * @param {function} launchHandler The custom launch callback to be executed.
     * @returns {Alexa} Returns itself to allow method chaining.
     */
    setLaunchHandler(launchHandler) {
        onLaunch = launchHandler;
        return this;
    }

    /**
     * The custom intent callbacks to be executed are passed to this method. This is required if you want your skill to
     * reply to the user when they give your skill commands.
     * <br />
     * The intent callbacks parameter should be a JavaScript object where the keys are mapped to the names of Intents
     * that your skill should implement (as defined in your Intent Schema) and the values are the callback functions
     * that will run on those intents. Each function will be provided a {@link Response} object that you can use to
     * respond to the user, as well as an event so that your skill can grab data from ite.
     *
     * @example
     * let intentHandlers = {
     *   'YourIntent': (event, response) => {
     *      response.tell(new Speech(Constants.SPEECH_TYPE_SSML, '<speak>Replace this with your intent response.</speak>'));
     * };
     *
     * setIntentHandlers (intentHandlers)
     *
     * @this Alexa
     * @param {Object} intentHandlers The custom intent callbacks to be executed. In a dictionary where the name of the
     * intent is the key and the callback is the value.
     * @returns {Alexa} Returns itself to allow method chaining.
     */
    setIntentHandlers(intentHandlers) {
        handlers = intentHandlers;
        return this;
    }

    /**
     * Setes the callback that will run when the skill ends a session. This is required if you want your skill to run
     * logic after the session has ended. This callback will be provided an event is so that your skill can grab data
     * from it.
     *
     * @example
     * let onSessionEnded = (event) => {
     *   // Put your custom session ended logic in here
     * };
     *
     * setSessionEndedHandler(onSessionEnded);
     *
     * @this Alexa
     * @param {function} sessionEndedHandler The custom session ended callback to be executed.
     * @returns {Alexa} Returns itself to allow method chaining.
     */
    setSessionEndedHandler(sessionEndedHandler) {
        onSessionEnded = sessionEndedHandler;
        return this;
    }

    /**
     * This is required if you want your skill to run logic after receiving an audio player request. This is optional
     * and can be removed if you are not using the Audio Player. It takes a JavaScript object where the key is mapped to
     * the name of the request type, and the value is mapped to the callbacks to be exceuted.
     *
     * @example
     * let audioPlayerHandlers = {};
     * audioPlayerHandlers[Constants.REQUEST_TYPE_AUDIO_PLAYER_PLAYBACK_STARTED] = (event, response) => {
     *   // do stuff
     * };
     * audioPlayerHandlers[Constants.REQUEST_TYPE_AUDIO_PLAYER_PLAYBACK_FAILED] = (event, response) => {
     *   // do stuff
     * };
     * audioPlayerHandlers[Constants.REQUEST_TYPE_AUDIO_PLAYER_PLAYBACK_STOPPED] = (event) => {
     *   // do stuff
     * };
     * * audioPlayerHandlers[Constants.REQUEST_TYPE_AUDIO_PLAYER_PLAYBACK_NEARLY_FINISHED] = (event, response) => {
     *   // do stuff
     * };
     * audioPlayerHandlers[Constants.REQUEST_TYPE_AUDIO_PLAYER_PLAYBACK_FAILED] = (event, response) => {
     *   // do stuff
     * };
     *
     * setAudioPlayerHandlers(audioPlayerHandlers);
     *
     * @this Alexa
     * @param {Object} audioPlayerHandlers The custom audio player callbacks to be executed. In a dictionary where the
     * name of the request type is the key and the callback is the value.
     * @returns {Alexa} Returns itself to allow method chaining.
     */
    setAudioPlayerHandlers(audioPlayerHandlers) {
        audioHandlers = audioPlayerHandlers;
        return this;
    }

    /**
     * This is required if you want your skill to run logic after receiving a playback controller request.
     *
     * @this Alexa
     * @param {Object} playbackControllerHandlers The custom playback controller callbacks to be executed. In a
     * dictionary where the name of the request type is the key and the callback is the value.
     * @returns {Alexa} Returns itself to allow method chaining.
     */
    setPlaybackControllerHandlers(playbackControllerHandlers) {
        playbackHandlers = playbackControllerHandlers;
        return this;
    }

    /**
     * This is required if you want your skill to run logic after receiving a system exception request.
     *
     * @this Alexa
     * @param {function} systemExceptionHandler The custom callback to be executed. It's passed the event so you can
     * grab data from it, but it is not passed a {@link Response} since you are not allowed to send a response.
     * @returns {Alexa} Returns itself to allow method chaining.
     */
    setSystemExceptionHandler(systemExceptionHandler) {
        exceptionHandler = systemExceptionHandler;
        return this;
    }
}

/**
 * Verifies that the request is intended for your service by checking that APP_ID (the application ID from the
 * constructor) is the same as appId (the application ID from exports.handler).
 *
 * @private
 * @param {string} appId The application ID from exports.handler.
 */
function validateAppId(appId) {
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
 * @private
 * @param {Object} event The event object passed in from the Lambda handler. This will contain the Alexa data.
 * @param {Object} context The context passed in from the Lambda handler.
 * @param {function} callback The callback passed in from the Lambda handler.
 */
function makeResponse(event, context, callback) {
    switch (event.request.type) {
        case Constants.REQUEST_TYPE_LAUNCH:
            handleLaunch(event, context, callback);
            break;
        case Constants.REQUEST_TYPE_INTENT:
            handleIntent(event, context, callback);
            break;
        case Constants.REQUEST_TYPE_SESSION_ENDED:
            handleSessionEnded(event, context, callback);
            break;
        case Constants.REQUEST_TYPE_AUDIO_PLAYER_PLAYBACK_STARTED:
        case Constants.REQUEST_TYPE_AUDIO_PLAYER_PLAYBACK_FINISHED:
            handleAudioPlayerRequestWithStopOrClear(event, context, callback);
            break;
        case Constants.REQUEST_TYPE_AUDIO_PLAYER_PLAYBACK_STOPPED:
            handleAudioPlayerRequestWithNoResponse(event, context, callback);
            break;
        case Constants.REQUEST_TYPE_AUDIO_PLAYER_PLAYBACK_NEARLY_FINISHED:
        case Constants.REQUEST_TYPE_AUDIO_PLAYER_PLAYBACK_FAILED:
            handleAudioPlayerRequest(event, context, callback);
            break;
        case Constants.REQUEST_TYPE_PLAYBACK_CONTROLLER_NEXT_COMMAND_ISSUED:
        case Constants.REQUEST_TYPE_PLAYBACK_CONTROLLER_PAUSE_COMMAND_ISSUED:
        case Constants.REQUEST_TYPE_PLAYBACK_CONTROLLER_PLAY_COMMAND_ISSUED:
        case Constants.REQUEST_TYPE_PLAYBACK_CONTROLLER_PREVIOUS_COMMAND_ISSUED:
            handlePlaybackControllerRequest(event, context, callback);
            break;
        case Constants.REQUEST_TYPE_SYSTEM_EXCEPTION_ENCOUNTERED:
            handleSystemExceptionEncountered(event, context, callback);
        default:
            throw `Request type ${event.request.type} not supported.`;
            break;
    }
}

/**
 * Wraps launch event callback.
 *
 * @private
 * @param {Object} event The event object passed in from the Lambda handler. This will contain the Alexa data.
 * @param {Object} context The context passed in from the Lambda handler.
 * @param {function} callback The callback passed in from the Lambda handler.
 */
function handleLaunch(event, context, callback) {
    let response = new Response();

    onLaunch(event, response);

    response.filterDirectives([
        Constants.DIRECTIVE_TYPE_AUDIO_PLAYER_PLAY,
        Constants.DIRECTIVE_TYPE_AUDIO_PLAYER_STOP,
        Constants.DIRECTIVE_TYPE_AUDIO_PLAYER_CLEAR_QUEUE
    ]);

    context.callbackWaitsForEmptyEventLoop = false;
    callback(null, response._response);
}

/**
 * Checks if the custom intent callback function exists and if so, calls it.
 *
 * @private
 * @param {Object} event The event object passed in from the Lambda handler. This will contain the Alexa data.
 * @param {Object} context The context passed in from the Lambda handler.
 * @param {function} callback The callback passed in from the Lambda handler.
 */
function handleIntent(event, context, callback) {
    let response = new Response();
    let handler = handlers[event.request.intent.name];

    if (handler) {
        handler(event, response);
    } else {
        throw `Intent ${event.request.intent.name} not supported.`;
    }

    response.filterDirectives([
        Constants.DIRECTIVE_TYPE_AUDIO_PLAYER_PLAY,
        Constants.DIRECTIVE_TYPE_AUDIO_PLAYER_STOP,
        Constants.DIRECTIVE_TYPE_AUDIO_PLAYER_CLEAR_QUEUE
    ]);

    context.callbackWaitsForEmptyEventLoop = false;
    callback(null, response._response);
}

/**
 * Wraps session ended event callback.
 *
 * @private
 * @param {Object} event The event object passed in from the Lambda handler. This will contain the Alexa data.
 * @param {Object} context The context passed in from the Lambda handler.
 * @param {function} callback The callback passed in from the Lambda handler.
 */
function handleSessionEnded(event, context, callback) {
    onSessionEnded(event);

    context.callbackWaitsForEmptyEventLoop = false;
    callback();
}

/**
 * Checks if the audio player request callback function exists and if so, calls it. Then it removes any invalid
 * directives, speech properties, reprompt properties, or card properties. Finally it sends the response back to the
 * skill.
 *
 * @private
 * @param {Object} event The event object passed in from the Lambda handler. This will contain the Alexa data.
 * @param {Object} context The context passed in from the Lambda handler.
 * @param {function} callback The callback passed in from the Lambda handler.
 */
function handleAudioPlayerRequestWithStopOrClear(event, context, callback) {
    let response = new Response();
    let handler = audioHandlers[event.request.type];

    if (handler) {
        handler(event, response);
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

    context.callbackWaitsForEmptyEventLoop = false;
    callback(null, response._response);
}

/**
 * Checks if the audio player request callback function exists and if so, calls it. This makes no response to the skill.
 *
 * @private
 * @param {Object} event The event object passed in from the Lambda handler. This will contain the Alexa data.
 * @param {Object} context The context passed in from the Lambda handler.
 * @param {function} callback The callback passed in from the Lambda handler.
 */
function handleAudioPlayerRequestWithNoResponse(event, context, callback) {
    let handler = audioHandlers[event.request.type];
    if (handler) {
        handler(event);
    } else {
        throw `Audio Player request ${event.request.type} not supported.`;
    }

    context.callbackWaitsForEmptyEventLoop = false;
    callback();
}

/**
 * Checks if the audio player request callback function exists and if so, calls it. Then it removes any invalid
 * speech properties, reprompt properties, or card properties. Finally it sends the response back to the skill.
 *
 * @private
 * @param {Object} event The event object passed in from the Lambda handler. This will contain the Alexa data.
 * @param {Object} context The context passed in from the Lambda handler.
 * @param {function} callback The callback passed in from the Lambda handler.
 */
function handleAudioPlayerRequest(event, context, callback) {
    let response = new Response();
    let handler = audioHandlers[event.request.type];

    if (handler) {
        handler(event, response);
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

    context.callbackWaitsForEmptyEventLoop = false;
    callback(null, response._response);
}

/**
 * Checks if the playback controller callback function exists and if so, calls it. Then it removes any invalid
 * speech properties, reprompt properties, or card properties. Finally it sends the response back to the skill.
 *
 * @private
 * @param {Object} event The event object passed in from the Lambda handler. This will contain the Alexa data.
 * @param {Object} context The context passed in from the Lambda handler.
 * @param {function} callback The callback passed in from the Lambda handler.
 */
function handlePlaybackControllerRequest(event, context, callback) {
    let response = new Response();
    let handler = playbackHandlers[event.request.type];

    if (handler) {
        handler(event, response);
    } else {
        throw `Playback Controller request ${event.request.type} not supported.`;
    }

    response.filterDirectives([
        Constants.DIRECTIVE_TYPE_AUDIO_PLAYER_PLAY,
        Constants.DIRECTIVE_TYPE_AUDIO_PLAYER_STOP,
        Constants.DIRECTIVE_TYPE_AUDIO_PLAYER_CLEAR_QUEUE
    ]);
    response.removeSpeech();
    response.removeReprompt();
    response.removeCard();

    context.callbackWaitsForEmptyEventLoop = false;
    callback(null, response._response);
}

/**
 * Checks if the exceptionHandler exists and if so, calls it. Then it completes the Lambda functione execution
 * successfully.
 *
 * @private
 * @param {Object} event The event object passed in from the Lambda handler. This will contain the Alexa data.
 * @param {Object} context The context passed in from the Lambda handler.
 * @param {function} callback The callback passed in from the Lambda handler.
 */
function handleSystemExceptionEncountered(event, context, callback) {
    let handler = exceptionHandler;

    if (handler) {
        handler(event);
    }

    context.callbackWaitsForEmptyEventLoop = false;
    callback();
}

module.exports = Alexa;
