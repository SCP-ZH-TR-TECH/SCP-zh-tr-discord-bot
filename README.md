SCP-ZH-TR Discord Bot
=================

## Usage
 The bot accepts the form of JSON and environment variables for config and always uses environment variables if provided.

 All config parameters can be provided in the form of environment variables by adding "SZB_" in front of the parameter name, e.g. "<code>SZB_CMD_PREFIX</code>".

| Config parameters | Required or not | Values | Default | Description |
| ---- | ---- | ---- | ---- | ---- |
| CMD_PREFIX | Optional | <code>String</code> | <code>&</code> | The prefix for using the commands of the bot |
| DIS_TOKEN | Required | <code>String</code> | empty string | The token for logging into your bot account |
| DIS_ADM_ROLE | Optional | <code>Array</code> of <code>String</code> | empty array | The role id(s) for using the bot's admin commands |
| DIS_NEWS_CHAN | Optional | <code>Array</code> of <code>String</code> | empty array | The channel id(s) for posting Wikidot new pages of the specified site to. |
| SCP_SITE | Optional | <code>String</code> | <code>zh</code> | The site for checking site activity for verification, should be site initial (branch tag). |


\ ゜o゜)ノ
