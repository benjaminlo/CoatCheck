'use strict';

module.exports = {
    VERSION_NUMBER: '1.0',
    
    SPEECH_TYPE_TEXT: 'PlainText',
    SPEECH_TYPE_SSML: 'SSML',

    ERROR_MESSAGE_INVALID_TYPE: 'Invalid Type',
    ERROR_MESSAGE_INVALID_APP_ID: 'Invalid Application ID',
    ERROR_MESSAGE_INVALID_APP_ID_MSG: 'The Application IDs do not match.',

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

    // replace this with your intent names
    YOUR_INTENT_NAME: 'YourIntent'
};
