'use strict';

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
    INTENT_ASK: 'COAT_CHECK_ASK'
};
