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

To create an `Alexa` object, include `alexa.js`.
Within the file is a class that takes 5 parameters.

|parameter|type|description|example|
|---|---|---|---|
|`APP_ID`|`string`|The Application ID that you can find on the Alexa Skill dashboard.|`'amzn1.echo-sdk.amz-.app.[your-unique-value-here]'`|
|`exports`|`Object`|The `exports` object required by Lambda.|N/A|
|`launchHandler`|`function`|The callback that will run when the skill launches without a command. More information in the *launchHandler* section.|`(response) => {/*do stuff*/}`|
|`intentHandlers`|`Object`|A JavaScript object where the keys are mapped to the names of Intents that your skill should implement (as defined in your Intent Schema) and the values are the callback functions that will run on those intents. More information in the *intentHandlers* section.|`{'AMAZON.HelpIntent': (response) => {/*do stuff*/}}`|
|`sessionEndedHandler`|`function`|The callback that will run when the skill ends a session. More information in the *sessionEndedHandler* section.|`() => {/*do stuff*/}`|

### launchHandler

The callback that will run when the skill launches with a command.
It will be provided a `Response` object that you can use to respond to the user.

#### Example
```
let launchHandler = (response) => {
    response.ask(new Speech(Constants.SPEECH_TYPE_SSML, '<speak>Replace this with a launch menu.</speak>'),
        new Speech(Constants.SPEECH_TYPE_SSML, '<speak>Replace this with reprompt text.</speak>'));
}
```

### intentHandlers

A JavaScript object where the keys are mapped to the names of Intents that your skill should implement (as defined in your Intent Schema) and the values are the callback functions that will run on those intents.
Each function will be provided a `Response` object that you can use to respond to the user.

#### Example

```
let intentHandlers = {
    'YourIntent': (response) => {
        response.tell(new Speech(Constants.SPEECH_TYPE_SSML, '<speak>Replace this with your intent response.</speak>'));
    }
};
```

### sessionEndedHandler

The callback that will run when the skill launches with a command.

#### Example

```
let onSessionEnded = () => {
    // Put your custom session ended logic in here
};
```

## Response Object

To create a `Response` object, include `response.js`.
Within the file is a class that takes two parameters in its constructor:

|parameter|type|description|example|
|---|---|---|---|
|`context`|`Object`|The `context` object passed in from Lambda.|N/A|
|`session`|`Object`|The `session` object passed in from Lambda.|N/A|

### Ask

This method will send a response to Alexa to vocalize a speech response and wait for the user's reply.
This method cannot be used if `askWithCard`, `tell`, `tellWithCard`, or another `ask` has already been called.

|parameter|type|description|example|
|---|---|---|---|
|`speech`|`Speech`|The `Speech` object that you would like Alexa to vocalize.|`new Speech('PlainText', 'Hello world')`|
|`repromptSpeech`|`Speech`|The `Speech` object that you would like Alexa to vocalize if the user does not reply.|`new Speech('PlainText', 'Hello world')`|

#### Example

```
let question = new Speech('PlainText', 'What can I do for you?');
let reprompt = new Speech('PlainText', 'I didn't hear a request. Is there anything I can do for you?');
response.ask(question, reprompt);
```

### Ask With Card

This method will send a response to Alexa to vocalize a speech response and wait for the user's reply.
As well, it displays content as a card in the Alexa companion app.
This method cannot be used if `ask`, `tell`, `tellWithCard`, or another `askWithCard` has already been called.

|parameter|type|description|example|
|---|---|---|---|
|`speech`|`Speech`|The `Speech` object that you would like Alexa to vocalize.|`new Speech('PlainText', 'Hello world')`|
|`repromptSpeech`|`Speech`|The `Speech` object that you would like Alexa to vocalize if the user does not reply.|`new Speech('PlainText', 'Hello world')`|
|`card`|`Card`|The `Card` object that you would like the Alexa companion app to display.|`new Card('My Title', 'My Text')`|

#### Example

```
let question = new Speech('PlainText', 'What can I do for you?');
let reprompt = new Speech('PlainText', 'I didn't hear a request. Is there anything I can do for you?');
let card = new Card('What Can I Do', 'I can do a lot for you!');
response.askWithCard(question, reprompt, card);
```

### Tell

This method will send a response to Alexa to vocalize a speech response.
This method cannot be used if `ask`, `askWithCard`, `tellWithCard`, or another `tell` has already been called.

|parameter|type|description|example|
|---|---|---|---|
|`speech`|`Speech`|The `Speech` object that you would like Alexa to vocalize.|`new Speech('PlainText', 'Hello world')`|

#### Example

```
let phrase = new Speech('PlainText', 'It is sunny outside today.');
response.tell(phrase);
```

### Tell With Card

This method will send a response to Alexa to vocalize a speech response.
As well, it displays content as a card in the Alexa companion app.
This method cannot be used if `ask`, `askWithCard`, `tell`, or another `tellWithCard` has already been called.

|parameter|type|description|example|
|---|---|---|---|
|`speech`|`Speech`|The `Speech` object that you would like Alexa to vocalize.|`new Speech('PlainText', 'Hello world')`|
|`card`|`Card`|The `Card` object that you would like the Alexa companion app to display.|`new Card('My Title', 'My Text')`|

#### Example

```
let phrase = new Speech('PlainText', 'It is sunny outside today.');
let card = new Card('Today's Weather Report', 'Sunny!');
response.tellWithCard(phrase, card);
```

## Speech Object

To create a `Speech` object, include `speech.js`.
Within the file is a class that takes two parameters in its constructor:

|parameter|type|description|example|
|---|---|---|---|
|`type`|`string`|The type of speech object you are creating. This can be either `SSML` or `PlainText`. We have provided `Constants.SPEECH_TYPE_SSML` and `Constants.SPEECH_TYPE_TEXT` for your convenience.|`'SSML'` or `'PlainText'`|
|`text`|`string`|The text that you would like Alexa to say. If the `type` you passed in as the first parameter is `SSML`, you will need valid SSML syntax (i.e. using `<speech></speech>` tags.|`<speech>Foobar</speech>` or `'Hello world'`|

### Example

```
let phrase = new Speech('PlainText', 'It is sunny outside today.');
```

## Card Object

To create a `Card` object, include `card.js`.
Within the file is a class that takes two parameters in its constructor:

|parameter|type|description|example|
|---|---|---|---|
|`title`|`string`|The title that you would like the Alexa companion app to display.|`'My Title'`|
|`text`|`string`|The text that you would like the Alexa companion app to display.|`'My text'`|

### Example

```
let card = new Card('Today's Weather Report', 'Sunny!');
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