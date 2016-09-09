# Alexa Starter Kit

## Description

A repository that can be forked to ease the initial development of an Amazon Alexa skill.

## Installation

Currently the project has no dependencies.

## Usage

1. Fork repo
1. Add your logic to `index.js`
1. ???
1. Profit!!!

## index.js

This is the entry point into the application.
Compose all the callbacks that your application logic will require, and then create a new `Alexa` object.

## Alexa Object

An Alexa object is used to handle custom intents and requests to an Alexa skill.
To create an `Alexa` object, include `alexa.js`.
Within the file is a class that takes 1 parameter in its constructor:

### Parameters

|parameter|type|description|
|---|---|---|
|`APP_ID`|`string`|The Application ID that you can find on the Alexa Skill dashboard in the following format: `'amzn1.echo-sdk.amz-.app.[your-unique-value-here]'`.|

### setLaunchHandler

This is required if you want your skill to reply to the user when they open your skill without a command.
The custom launch callback to be executed is passed to this method.

#### Parameters

|parameter|type|description|
|---|---|---|
|`launchHandler`|`function`|The callback that will run when the skill launches with a command. (See launchHandler section)|

#### Example

```
let launchHandler = (response, event, context, session) => {
    response.ask(new Speech(Constants.SPEECH_TYPE_SSML, '<speak>Replace this with a launch menu.</speak>'),
        new Speech(Constants.SPEECH_TYPE_SSML, '<speak>Replace this with reprompt text.</speak>'));
}
setLaunchHandler(launchHandler);
```

#### launchHandler

The callback that will run when the skill launches with a command.
It will be provided a `Response` object that you can use to respond to the user, as well as an event, context, and session so that your skill can grab data from them.

##### Parameters

|parameter|type|description|
|---|---|---|
|`response`|`Object`|A Response object is used to create a valid JSON response that will respond to the Alexa skill.|
|`event`|`Object`|The event object from exports.handler.|
|`context`|`Object`|The context passed in from Alexa.|
|`session`|`Object`|The session passed in from Alexa.|

##### Example
```
let launchHandler = (response, event, context, session) => {
    response.ask(new Speech(Constants.SPEECH_TYPE_SSML, '<speak>Replace this with a launch menu.</speak>'),
        new Speech(Constants.SPEECH_TYPE_SSML, '<speak>Replace this with reprompt text.</speak>'));
}
```

### setIntentHandlers

This is required if you want your skill to reply to the user when they give your skill commands.
The custom intent callbacks to be executed are passed to this method.

#### Parameters

|parameter|type|description|
|---|---|---|
|`intentHandlers`|`Object`|The custom intent callbacks to be executed. (See intentHandlers section)|

#### Example

```
let intentHandlers = {
    'YourIntent': (response, event, context, session) => {
        response.tell(new Speech(Constants.SPEECH_TYPE_SSML, '<speak>Replace this with your intent response.</speak>'));
    }
};
setIntentHandlers(intentHandlers);
```

#### intentHandlers

A JavaScript object where the keys are mapped to the names of Intents that your skill should implement (as defined in your Intent Schema) and the values are the callback functions that will run on those intents.
Each function will be provided a `Response` object that you can use to respond to the user, as well as an event, context, and session so that your skill can grab data from them.

##### Parameters

|parameter|type|description|
|---|---|---|
|`response`|`Object`|A Response object is used to create a valid JSON response that will respond to the Alexa skill.|
|`event`|`Object`|The event object from exports.handler.|
|`context`|`Object`|The context passed in from Alexa.|
|`session`|`Object`|The session passed in from Alexa.|

##### Example

```
let intentHandlers = {
    'YourIntent': (response, event, context, session) => {
        response.tell(new Speech(Constants.SPEECH_TYPE_SSML, '<speak>Replace this with your intent response.</speak>'));
    }
};
```

### setSessionEndedHandler

This is required if you want your skill to run logic after the session has ended.
The custom session ended callback to be executed is passed to this method.

#### Parameters

|parameter|type|description|
|---|---|---|
|`sessionEndedHandler`|`function`|The custom session ended callback to be executed. (See sessionEndedHandler section)|

#### Example

```
let onSessionEnded = (event, context, session) => {
    // Put your custom session ended logic in here
};
setSessionEndedHandler(onSessionEnded);
```

#### sessionEndedHandler

The callback that will run when the skill launches with a command.
Each function will be provided an event, context, and session is so that your skill can grab data from them.

##### Parameters

|parameter|type|description|
|---|---|---|
|`event`|`Object`|The event object from exports.handler.|
|`context`|`Object`|The context passed in from Alexa.|
|`session`|`Object`|The session passed in from Alexa.|

##### Example

```
let onSessionEnded = (event, context, session) => {
    // Put your custom session ended logic in here
};
```

### setAudioPlayerHandlers

This is required if you want your skill to run logic after receiving an audio player request.
The custom Audio Player callbacks to be executed are passed to this method.
This is optional and can be removed if you are not using the Audio Player.

#### Parameters

|parameter|type|description|
|---|---|---|
|`audioPlayerHandlers`|`Object`|The custom Audio Player callbacks to be executed. (See audioPlayerHandlers section)|

#### Example

```
let audioPlayerHandlers = {};

// set your audio player handlers

setAudioPlayerHandlers(audioPlayerHandlers);
```

#### audioPlayerHandlers

A JavaScript object where the keys are mapped to the Audio Player requests that your skill should respond to and the values are the callback functions that will run on those requests. 
We have provided `Constants.REQUEST_TYPE_AUDIO_PLAYER_PLAYBACK_STARTED`, `Constants.REQUEST_TYPE_AUDIO_PLAYER_PLAYBACK_FAILED`, `Constants.REQUEST_TYPE_AUDIO_PLAYER_PLAYBACK_STOPPED`, `Constants.REQUEST_TYPE_AUDIO_PLAYER_PLAYBACK_NEARLY_FINISHED`, and `Constants.REQUEST_TYPE_AUDIO_PLAYER_PLAYBACK_FAILED` for your convenience.
Each function will be provided an event, context, and session so that your skill can grab data from them.

##### Parameters

|parameter|type|description|
|---|---|---|
|`event`|`function`|The event object from exports.handler.|
|`context`|`function`|The context passed in from Alexa.|
|`session`|`function`|The session passed in from Alexa.|

##### Example

```
let audioPlayerHandlers = {};
audioPlayerHandlers[Constants.REQUEST_TYPE_AUDIO_PLAYER_PLAYBACK_STARTED] = (event, context, session) => {
    // do stuff
};
audioPlayerHandlers[Constants.REQUEST_TYPE_AUDIO_PLAYER_PLAYBACK_FAILED] = (event, context, session) => {
    // do stuff
};
audioPlayerHandlers[Constants.REQUEST_TYPE_AUDIO_PLAYER_PLAYBACK_STOPPED] = (event, context, session) => {
    // do stuff
};
audioPlayerHandlers[Constants.REQUEST_TYPE_AUDIO_PLAYER_PLAYBACK_NEARLY_FINISHED] = (event, context, session) => {
    // do stuff
};
audioPlayerHandlers[Constants.REQUEST_TYPE_AUDIO_PLAYER_PLAYBACK_FAILED] = (event, context, session) => {
    // do stuff
};
```

## Response Object

A Response object is used to create a valid JSON response that will respond to the Alexa skill.
To create a `Response` object, include `response.js`.
Within the file is a class that takes no parameters in its constructor.

### Ask

This method will send a response to Alexa to vocalize a speech response and wait for the user's reply.
This method cannot be used if `askWithCard`, `tell`, `tellWithCard`, or another `ask` has already been called.

#### Parameters

|parameter|type|description|
|---|---|---|
|`speech`|`Speech`|The `Speech` object that you would like Alexa to vocalize.|
|`repromptSpeech`|`Speech`|The `Speech` object that you would like Alexa to vocalize if the user does not reply.|

#### Example

```
let question = new Speech(Constants.SPEECH_TYPE_TEXT, 'What can I do for you?');
let reprompt = new Speech(Constants.SPEECH_TYPE_TEXT, 'I didn't hear a request. Is there anything I can do for you?');
response.ask(question, reprompt);
```

### Ask With Card

This method will send a response to Alexa to vocalize a speech response and wait for the user's reply.
As well, it displays content as a card in the Alexa companion app.
This method cannot be used if `ask`, `tell`, `tellWithCard`, or another `askWithCard` has already been called.

#### Parameters

|parameter|type|description|
|---|---|---|
|`speech`|`Speech`|The `Speech` object that you would like Alexa to vocalize.|
|`repromptSpeech`|`Speech`|The `Speech` object that you would like Alexa to vocalize if the user does not reply.|
|`card`|`Card`|The `Card` object that you would like the Alexa companion app to display.|

#### Example

```
let question = new Speech(Constants.SPEECH_TYPE_TEXT, 'What can I do for you?');
let reprompt = new Speech(Constants.SPEECH_TYPE_TEXT, 'I didn't hear a request. Is there anything I can do for you?');
let card = new Card('What Can I Do', 'I can do a lot for you!');
response.askWithCard(question, reprompt, card);
```

### Tell

This method will send a response to Alexa to vocalize a speech response.
This method cannot be used if `ask`, `askWithCard`, `tellWithCard`, or another `tell` has already been called.

#### Parameters

|parameter|type|description|
|---|---|---|
|`speech`|`Speech`|The `Speech` object that you would like Alexa to vocalize.|

#### Example

```
let phrase = new Speech(Constants.SPEECH_TYPE_TEXT, 'It is sunny outside today.');
response.tell(phrase);
```

### Tell With Card

This method will send a response to Alexa to vocalize a speech response.
As well, it displays content as a card in the Alexa companion app.
This method cannot be used if `ask`, `askWithCard`, `tell`, or another `tellWithCard` has already been called.

#### Parameters

|parameter|type|description|
|---|---|---|
|`speech`|`Speech`|The `Speech` object that you would like Alexa to vocalize.|
|`card`|`Card`|The `Card` object that you would like the Alexa companion app to display.|

#### Example

```
let phrase = new Speech(Constants.SPEECH_TYPE_TEXT, 'It is sunny outside today.');
let card = new Card('Today's Weather Report', 'Sunny!');
response.tellWithCard(phrase, card);
```

### addDirective
This method will add a Directive object to this response. 
Note: If the directive object is not valid as part of a response to the event, it may be removed by the Alexa object before the response is sent.

#### Parameters

|parameter|type|description|
|---|---|---|
|`directive`|`Directive`|The `Directive` object that you would like Alexa to perform.|

#### Example

```
let directive = new Directive(context);
response.addDirective(directive);
```

## Speech Object

A Speech object is used to create a valid JSON object that will be used to tell Alexa to respond with a text-to-speech audio.
To create a `Speech` object, include `speech.js`.
Within the file is a class that takes two parameters in its constructor:

### Parameters

|parameter|type|description|
|---|---|---|
|`type`|`string`|The type of speech object you are creating. This can be either `Constants.SPEECH_TYPE_SSML` or `Constants.SPEECH_TYPE_TEXT`.|
|`text`|`string`|The text that you would like Alexa to say. If the `type` you passed in as the first parameter is `Constants.SPEECH_TYPE_SSML`, you will need valid SSML syntax (i.e. using `<speech></speech>` tags.|

### Example

```
let phrase = new Speech(`Constants.SPEECH_TYPE_TEXT`, 'It is sunny outside today.');
```

## Card Object

A Card object is used to create a valid JSON object that will be used to tell Alexa to respond with a card object in the companion app.
To create a `Card` object, include `card.js`.
Within the file is a class that takes two parameters in its constructor:

### Parameters

|parameter|type|description|
|---|---|---|
|`title`|`string`|The title that you would like the Alexa companion app to display.|
|`text`|`string`|The text that you would like the Alexa companion app to display.|

### Example

```
let card = new Card('Today's Weather Report', 'Sunny!');
```

## Directive Object

A Directive object is used to create a valid JSON property for a Response object that will tell a client to perform a certain action.
To create a `Directive` object, include `directive.js`.
Within the file is the a class that takes one parameter in its constructor:

### Parameters

|parameter|type|description|
|---|---|---|
|`context`|`Object`|The context passed in from Alexa.|

### Example

```
let directive = new Directive(context);
```

## Intent Schema

To add your own custom intents, you will need to add them to the **Intent Schema** section of the Alexa Skill.
We included an `intentSchema.json` file that you can keep up to date in your repo to match the intents that each version of your skill supports.

To add the custom intent to your skill:

- Head to the [Amazon Developer Console](https://developer.amazon.com).
- Open your Alexa skill.
- Navigate to the Interaction Model section.
- Paste your `intentSchema.json` into the **Intent Schema** section.

Refer to [Defining the Voice Interface](https://developer.amazon.com/appsandservices/solutions/alexa/alexa-skills-kit/docs/defining-the-voice-interface#h2_intents) for the Intent Schema format.

## Sample Utterances

To add your own sample utterances, you will need to add them to the **Sample Utterances** section of the Alexa Skill.
We included a `sampleUtterances.txt` file that you can keep up to date in your repo to match the intents that each version of your skill supports.

To add the custom sample utterances to your skill:

- Head to the [Amazon Developer Console](https://developer.amazon.com).
- Open your Alexa skill.
- Navigate to the Interaction Model section.
- Paste your `sampleUtterances.txt` into the **Sample Utterances** section.

Refer to [Defining the Voice Interface](https://developer.amazon.com/appsandservices/solutions/alexa/alexa-skills-kit/docs/defining-the-voice-interface#h2_sample_utterances) for the Sample Utterances format.