module.exports = {
    VERSION_NUMBER: '1.0',

    SPEECH_TYPE_TEXT: 'PlainText',
    SPEECH_TYPE_SSML: 'SSML',

    ERROR_MESSAGE_INVALID_TYPE: 'Invalid Type',
    ERROR_MESSAGE_INVALID_APP_ID: 'Invalid Application ID',
    ERROR_MESSAGE_INVALID_APP_ID_MSG: 'The Application IDs do not match.',


    ERROR_MESSAGE_INVALID_TYPE_FILTER_DIRECTIVES: 'Invalid Type Filter directives expects an Array.',

    ERROR_MESSAGE_INVALID_PLAY_BEHAVIOR: 'Invalid Type Play Behavior must be Constants.PLAY_BEHAVIOR_REPLACE_ALL or Constants.PLAY_BEHAVIOR_ENQUEUE or Constants.PLAY_BEHAVIOR_REPLACE_ENQUEUED.',
    ERROR_MESSAGE_INVALID_TYPE_TITLE: 'Invalid Type title must be a string.',
    ERROR_MESSAGE_INVALID_TYPE_TEXT: 'Invalid Type text must be a string.',
    ERROR_MESSAGE_INVALID_TYPE_URL: 'Invalid Type URL must be a string.',
    ERROR_MESSAGE_INVALID_TYPE_TOKEN: 'Invalid Type Token must be a string.',
    ERROR_MESSAGE_INVALID_TYPE_EXPECTED_PREVIOUS_TOKEN: 'Invalid Type Expected previous token must be a string.',
    ERROR_MESSAGE_INVALID_TYPE_OFFSET_IN_MILLISECONDS: 'Invalid Type Offset in milliseconds must be a number.',

    ERROR_MESSAGE_INVALID_CLEAR_BEHAVIOR: 'Invalid Type Clear Behavior must be Constants.CLEAR_BEHAVIOR_ENQUEUED or Constants.CLEAR_BEHAVIOR_ALL.',

    MESSAGE_EXPECTED: 'Expected: ',
    MESSAGE_ACTUAL: 'Actual: ',

    CONSTANTS_NEW_LINE: '\n',

    CARD_TYPE_SIMPLE: 'Simple',

    REQUEST_TYPE_LAUNCH: 'LaunchRequest',
    REQUEST_TYPE_INTENT: 'IntentRequest',
    REQUEST_TYPE_SESSION_ENDED: 'SessionEndedRequest',

    REQUEST_TYPE_AUDIO_PLAYER_PLAYBACK_STARTED: 'AudioPlayer.PlaybackStarted',
    REQUEST_TYPE_AUDIO_PLAYER_PLAYBACK_FINISHED: 'AudioPlayer.PlaybackFinished',
    REQUEST_TYPE_AUDIO_PLAYER_PLAYBACK_STOPPED: 'AudioPlayer.PlaybackStopped',
    REQUEST_TYPE_AUDIO_PLAYER_PLAYBACK_NEARLY_FINISHED: 'AudioPlayer.NearlyFinished',
    REQUEST_TYPE_AUDIO_PLAYER_PLAYBACK_FAILED: 'AudioPlayer.PlaybackFailed',

    REQUEST_TYPE_PLAYBACK_CONTROLLER_NEXT_COMMAND_ISSUED: 'PlaybackController.NextCommandIssued',
    REQUEST_TYPE_PLAYBACK_CONTROLLER_PAUSE_COMMAND_ISSUED: 'PlaybackController.PauseCommandIssued',
    REQUEST_TYPE_PLAYBACK_CONTROLLER_PLAY_COMMAND_ISSUED: 'PlaybackController.PlayCommandIssued',
    REQUEST_TYPE_PLAYBACK_CONTROLLER_PREVIOUS_COMMAND_ISSUED: 'PlaybackController.PreviousCommandIssued',

    REQUEST_TYPE_SYSTEM_EXCEPTION_ENCOUNTERED: 'System.ExceptionEncountered',

    DIRECTIVE_TYPE_AUDIO_PLAYER_PLAY: 'AudioPlayer.Play',
    DIRECTIVE_TYPE_AUDIO_PLAYER_STOP: 'AudioPlayer.Stop',
    DIRECTIVE_TYPE_AUDIO_PLAYER_CLEAR_QUEUE: 'AudioPlayer.ClearQueue',

    DIRECTIVE_PROPERTY_TYPE: 'type',
    DIRECTIVE_PROPERTY_PLAY_BEHAVIOR: 'playBehavior',
    DIRECTIVE_PROPERTY_CLEAR_BEHAVIOR: 'clearBehavior',
    DIRECTIVE_PROPERTY_AUDIO_ITEM: 'audioItem',

    CLEAR_BEHAVIOR_ENQUEUED: 'CLEAR_ENQUEUED',
    CLEAR_BEHAVIOR_ALL: 'CLEAR_ALL',

    PLAY_BEHAVIOR_REPLACE_ALL: 'REPLACE_ALL',
    PLAY_BEHAVIOR_ENQUEUE: 'ENQUEUE',
    PLAY_BEHAVIOR_REPLACE_ENQUEUED: 'REPLACE_ENQUEUED',

    TYPE_STRING: 'string',

    // Replace this with your intent names
    INTENT_ADD: 'COAT_CHECK_ADD',
    INTENT_DELETE: 'COAT_CHECK_DELETE',
    INTENT_ASK: 'COAT_CHECK_ASK',
    INTENT_HELP: 'COAT_CHECK_HELP',

    HTTP_METHOD_POST: 'POST',
    HTTP_METHOD_GET: 'GET',
    HTTP_RESPONSE_CODE_OK: 200,

    URL_ADD: 'http://coat-check.cfapps.io/add',
    URL_ASK: 'http://coat-check.cfapps.io/ask?tags=[{0}]',
    URL_DELETE: 'http://coat-check.cfapps.io/delete',

    URL_ACCUWEATHER: 'http://apidev.accuweather.com/forecasts/v1/hourly/12hour/55488.json?apikey=HackuWeather2016&details=true&metric=true',

    CLOTHING_KEY_NAME: 'name',
    TAGS_KEY_NAME: 'tags',

    JSON_KEY_URL: 'url',
    JSON_KEY_METHOD: 'method',

    TAG_HOT: 'hot',
    TAG_MODERATE: 'moderate',
    TAG_COLD: 'cold',
    TAG_SUN: 'sun',
    TAG_RAIN: 'rain',
    TAG_SNOW: 'snow',

    THRESHOLD_PROBABILITY: 50,
    THRESHOLD_COLD: 10,
    THRESHOLD_MODERATE: 20,

    ALEXA_MESSAGE_OPEN_CLOSET: 'Opening your closet. You can add and remove clothing or say help.',
    ALEXA_MESSAGE_HELP: 'Here are some things you can say: What should I wear?, What is the weather today? or Add my blue T-Shirt to my closet. So how can I help you?',
    ALEXA_MESSAGE_ADDED: 'I added {0} to your closet.',
    ALEXA_MESSAGE_DELETED: 'Your {0} has been removed from your closet. What would you like to do?',
    ALEXA_MESSAGE_NOT_FOUND: 'I\'m sorry I could not find {0} in your closet. What would you like to do?',
    ALEXA_MESSAGE_SERVER_ERROR: 'I had an issue communicating with your closet.',
    ALEXA_MESSAGE_REPROMPT: 'I didn\'t quite catch that. What would you like to do?',
    ALEXA_MESSAGE_SNOW: ' with a {0} percent chance of snow',
    ALEXA_MESSAGE_RAIN: ' with a {0} percent chance of rain',
    ALEXA_MESSAGE_CLEAR_SKIES: ' with clear skies',
    ALEXA_MESSAGE_CLOUD_COVER: ' with a {0} percent cloud cover',
    ALEXA_MESSAGE_SUGGESTION: 'It will be {0} degrees celsius{1}. You should wear your {2}.'
};

'use strict';
