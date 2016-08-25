'use strict';

let Constants = require('./constants.js');
let Response = require('./response.js');
let Speech = require('./speech.js');

exports.handler = (event, context, callback) => {
    if (!event) {
        event = {};
    };

    let session = event.session || {};
    let response = new Response(context, session);
};
