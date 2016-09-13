# Alexa Starter Kit

## Description

A repository that can be forked to ease the initial development of an Amazon Alexa skill.

## Installation

Currently the project has no production dependencies.
To run tests or generate the docs, though, you will need to run the npm install command.

```
$ npm install
```

## Running Tests

You can run tests using the npm test command.

```
$ npm test
```

## Generating the Docs

The classes are annotated with JSDoc style comments.
These are parsed by JSDoc when you run the JSDoc command.

```
$ npm run-script docs
```

The docs will then be found in the `./docs/` folder and can be read in any web browser.

## Usage

1. Fork repo
1. Add your logic to `index.js`
1. ???
1. Profit!!!

## index.js

This is the entry point into the application.
Compose all the callbacks that your application logic will require, and then create a new `Alexa` object.

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