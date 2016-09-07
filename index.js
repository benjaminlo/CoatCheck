'use strict';

const Alexa = require('./alexa.js');
const Constants = require('./constants.js');
const Speech = require('./speech.js');

const APP_ID = ''; // replace with "amzn1.echo-sdk.amz-.app.[your-unique-value-here]"

let onLaunch = (response) => {
    // Put your custom launch logic in here
    response.ask(new Speech(Constants.SPEECH_TYPE_SSML, '<speak>Replace this with a launch menu.</speak>'),
        new Speech(Constants.SPEECH_TYPE_SSML, '<speak>Replace this with reprompt text.</speak>'));
};

let onSessionEnded = () => {
    // Put your custom session ended logic in here
};

let intentHandlers = {};
intentHandlers[Constants.YOUR_INTENT_NAME] = (response) => {
    response.tell(new Speech(Constants.SPEECH_TYPE_SSML, '<speak>Replace this with your intent response.</speak>'));
};

// Remove this if you are not using Audio Player
let audioPlayerHandlers = {};
audioPlayerHandlers[Constants.REQUEST_TYPE_AUDIO_PLAYER_PLAYBACK_STARTED] = (event) => {
    // do stuff
};
audioPlayerHandlers[Constants.REQUEST_TYPE_AUDIO_PLAYER_PLAYBACK_FAILED] = (event) => {
    // do stuff
};
audioPlayerHandlers[Constants.REQUEST_TYPE_AUDIO_PLAYER_PLAYBACK_STOPPED] = (event) => {
    // do stuff
};
audioPlayerHandlers[Constants.REQUEST_TYPE_AUDIO_PLAYER_PLAYBACK_NEARLY_FINISHED] = (event) => {
    // do stuff
};
audioPlayerHandlers[Constants.REQUEST_TYPE_AUDIO_PLAYER_PLAYBACK_FAILED] = (event) => {
    // do stuff
};

// Remove this if you are not using Playback Controller
let playbackControllerHandlers = {};
playbackControllerHandlers[Constants.REQUEST_TYPE_PLAYBACK_CONTROLLER_NEXT_COMMAND_ISSUED] = (event) => {
    // do stuff
};
playbackControllerHandlers[Constants.REQUEST_TYPE_PLAYBACK_CONTROLLER_PAUSE_COMMAND_ISSUED] = (event) => {
    // do stuff
};
playbackControllerHandlers[Constants.REQUEST_TYPE_PLAYBACK_CONTROLLER_PLAY_COMMAND_ISSUED] = (event) => {
    // do stuff
};
playbackControllerHandlers[Constants.REQUEST_TYPE_PLAYBACK_CONTROLLER_PREVIOUS_COMMAND_ISSUED] = (event) => {
    // do stuff
};

let alexa = new Alexa(APP_ID)
    .setLaunchHandler(onLaunch)
    .setIntentHandlers(intentHandlers)
    .setSessionEndedHandler(onSessionEnded)
    .setAudioPlayerHandlers(audioPlayerHandlers) // Remove this if you are not using Audio Player
    .setPlaybackControllerHandlers(playbackControllerHandlers) // Remove this if you are not using Playback Controller
    .createLambdaConnection(exports); // This has to go last
