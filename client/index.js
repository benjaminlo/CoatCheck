'use strict';

const Alexa = require('./alexa/alexa.js');
const Constants = require('./alexa/constants.js');
const Speech = require('./alexa/speech.js');

const APP_ID = ''; // replace with "amzn1.echo-sdk.amz-.app.[your-unique-value-here]"

let onLaunch = (event, response) => {
    // Put your custom launch logic in here
    response.tell(new Speech(Constants.SPEECH_TYPE_TEXT, 'open menu'));
};

let onSessionEnded = (event) => {
    // Put your custom session ended logic in here
    // session ended handler is unable to send a response
};

let intentHandlers = {};
intentHandlers[Constants.INTENT_ADD] = (event, response) => {
    response.tell(new Speech(Constants.SPEECH_TYPE_TEXT, 'hello world add'));
};
intentHandlers[Constants.INTENT_ASK] = (event, response) => {
    response.tell(new Speech(Constants.SPEECH_TYPE_TEXT, 'hello world ask'));
};
intentHandlers[Constants.INTENT_DELETE] = (event, response) => {
    response.tell(new Speech(Constants.SPEECH_TYPE_TEXT, 'hello world delete'));
};

// Remove this if you are not using Audio Player
let audioPlayerHandlers = {};
audioPlayerHandlers[Constants.REQUEST_TYPE_AUDIO_PLAYER_PLAYBACK_STARTED] = (event, response) => {
    // do stuff
};
audioPlayerHandlers[Constants.REQUEST_TYPE_AUDIO_PLAYER_PLAYBACK_FINISHED] = (event, response) => {
    // do stuff
};
audioPlayerHandlers[Constants.REQUEST_TYPE_AUDIO_PLAYER_PLAYBACK_STOPPED] = (event) => {
    // do stuff
    // playback stopped request is unable to send a response
};
audioPlayerHandlers[Constants.REQUEST_TYPE_AUDIO_PLAYER_PLAYBACK_NEARLY_FINISHED] = (event, response) => {
    // do stuff
};
audioPlayerHandlers[Constants.REQUEST_TYPE_AUDIO_PLAYER_PLAYBACK_FAILED] = (event, response) => {
    // do stuff
};

// Remove this if you are not using Playback Controller
let playbackControllerHandlers = {};
playbackControllerHandlers[Constants.REQUEST_TYPE_PLAYBACK_CONTROLLER_NEXT_COMMAND_ISSUED] = (event, response) => {
    // do stuff
};
playbackControllerHandlers[Constants.REQUEST_TYPE_PLAYBACK_CONTROLLER_PAUSE_COMMAND_ISSUED] = (event, response) => {
    // do stuff
};
playbackControllerHandlers[Constants.REQUEST_TYPE_PLAYBACK_CONTROLLER_PLAY_COMMAND_ISSUED] = (event, response) => {
    // do stuff
};
playbackControllerHandlers[Constants.REQUEST_TYPE_PLAYBACK_CONTROLLER_PREVIOUS_COMMAND_ISSUED] = (event, response) => {
    // do stuff
};

// Remove this if you do not want to add logic for System Exceptions
let exceptionHandler = (event) => {
    // do stuff
    // exception handler is unable to send a response

    throw (event.request);
};

let alexa = new Alexa(APP_ID)
    .setLaunchHandler(onLaunch)
    .setIntentHandlers(intentHandlers)
    .setSessionEndedHandler(onSessionEnded)
    .setAudioPlayerHandlers(audioPlayerHandlers) // Remove this if you are not using Audio Player
    .setPlaybackControllerHandlers(playbackControllerHandlers) // Remove this if you are not using Playback Controller
    .setSystemExceptionHandler(exceptionHandler) // Remove this if you do not want to add logic for System Exceptions
    .createLambdaConnection(exports); // This has to go last
