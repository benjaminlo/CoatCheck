'use strict';

const Constants = require('./constants.js');
const Response = require('./response.js');
const Speech = require('./speech.js');

let APP_ID;

let onLaunch;
let handlers = {};
let onSessionEnded;

class AlexaStarterKit {
    constructor (appId, exports, launchHandler, intentHandlers, sessionEndedHandler) {
        APP_ID = appId;

        onLaunch = launchHandler;
        handlers = intentHandlers;
        onSessionEnded = sessionEndedHandler;

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

            validateAppId(applicationId);

            makeResponse(event, context, session);
        };
    }
}

function validateAppId (appId) {
    if (APP_ID && APP_ID !== appId) {
        console.log(Constants.ERROR_MESSAGE_INVALID_APP_ID_MSG
            + Constants.CONSTANTS_NEW_LINE + Constants.MESSAGE_EXPECTED + APP_ID
            + Constants.CONSTANTS_NEW_LINE + Constants.MESSAGE_ACTUAL + appId);

        throw Constants.ERROR_MESSAGE_INVALID_APP_ID;
    }
}

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

function handleIntent(event, response) {
    let callback = handlers[event.request.intent.name];
    if (callback) {
        callback(response);
    } else {
        throw `Intent ${event.request.intent.name} not supported.`;
    }
}

module.exports = AlexaStarterKit;
