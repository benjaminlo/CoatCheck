'use strict';

const Alexa = require('./alexa/alexa.js');
const CoatCheck = require('./coat_check/coatCheck.js');

const APP_ID = ''; // replace with "amzn1.echo-sdk.amz-.app.[your-unique-value-here]"

let coatCheck = new CoatCheck(exports, new Alexa(APP_ID)).createLambdaConnection();