# Lacey
Twitch channel: [Lacey96](https://twitch.tv/lacey96)

Built with [tmi.js](https://github.com/tmijs)

Lacey is a personalized twitch bot, making this repo have very little value to anyone else. However, if you wish to use this bot (or build off of it):
- clone this repo
- `npm install`
- create `auth.json` (following the example file as a base)
- `node lacey`

## Commands
`<>` indicates required parameters, `()` indicates optional parameters
- `hey`: Greets you : )
- `!wr <game> (category)`: Gives world record for game and category from [speedrun.com API](https://github.com/speedruncom/api)

## Terminal
Extra control using stdin where `lacey.js` is running
- `<message>`: Send a message to the home channel (first channel specified in `auth.json`) as Lacey
