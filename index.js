'use strict';

const Constants = require('./constants.js');
const Response = require('./response.js');
const Speech = require('./speech.js');

const APP_ID = undefined; // replace with "amzn1.echo-sdk.amz-.app.[your-unique-value-here]"

exports.handler = (event, context, callback) => {
    let appId;
    let session;

    if (!event) {
        event = {};
    }

    if (event.session) {
        session = event.session;
        appId = session.application.applicationId;
    } else {
        session = {};
        appId = event.context.System.application.applicationId;
    }

    validateAppId(appId);

    let response = new Response(context, session);
};

function validateAppId (appId) {
    if (APP_ID && APP_ID !== appId) {
        console.log(Constants.ERROR_MESSAGE_INVALID_APP_ID_MSG
            + Constants.CONSTANTS_NEW_LINE + Constants.MESSAGE_EXPECTED + APP_ID
            + Constants.CONSTANTS_NEW_LINE + Constants.MESSAGE_ACTUAL + appId);

        throw Constants.ERROR_MESSAGE_INVALID_APP_ID;
    }
}
