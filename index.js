'use strict';

const Alexa = require('./alexaStarterKit.js');
const Constants = require('./constants.js');
const Speech = require('./speech.js');

const APP_ID = undefined; // replace with "amzn1.echo-sdk.amz-.app.[your-unique-value-here]"

let onLaunch = (response) => {
    // Put your custom launch logic in here
    response.ask(new Speech(Constants.SPEECH_TYPE_SSML, '<speak>Replace this with a launch menu.</speak>'),
        new Speech(Constants.SPEECH_TYPE_SSML, '<speak>Replace this with reprompt text.</speak>'));
};

let onSessionEnded = () => {
    // Put your custom session ended logic in here
};

let intentHandlers = {
    'YourIntent': (response) => {
        response.tell(new Speech(Constants.SPEECH_TYPE_SSML, '<speak>Replace this with your intent response.</speak>'));
    },
    'AMAZON.HelpIntent': (response) => {
        response.ask(new Speech(Constants.SPEECH_TYPE_SSML, '<speak>Replace this with an actual help menu.</speak>'),
            new Speech(Constants.SPEECH_TYPE_SSML, '<speak>Replace this with reprompt text.</speak>'));
    },
    'AMAZON.StopIntent': (response) => {
        response.tell(new Speech(Constants.SPEECH_TYPE_SSML, '<speak>Replace this with stop message.</speak>'));
    }
};

let alexa = new Alexa(APP_ID, exports, onLaunch, intentHandlers, onSessionEnded);
