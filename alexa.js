'use strict';

const Constants = require('./constants.js');
const Response = require('./response.js');
const Speech = require('./speech.js');

let APP_ID;
let onLaunch = (response) => {
    throw 'Unimplemented launch handler.';
};
let handlers = {};
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
     * @param {Object} intentHandlers The custom intent callbacks to be executed.
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
}

/**
 * Verifies that the request is intended for your service by checking that APP_ID (the application ID from the constructor)
 * is the same as appId (the application ID from exports.handler).
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

module.exports = Alexa;
