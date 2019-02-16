# Discord-Nations-Programs
This is all of the code related to my work in Discord Nations. It consists of webhooks and a bot that I am developing. All links are expunged from the Github repository since it is public.

## Date.js
The date sheet displays the in-game time which starts in 2019 and progresses 2 weeks for every day in the real world. Accordingly, every day between 10 and 11 PM EST, the bot sends a message to the Date channel in the Discord Server.

## Econ.js
This is the file that has the webhook that parses the Google Form for changes to the economy and displays the form as an embedded message into the moderator server for Discord Nations.

## Military.js
This is the file that has the webhook that parses the Google Form for changes to the military and displays the form as an embedded message into the moderator server for Discord Nations.

## Research.js
This is the file that has the webhook that parses the Google Form for research and construction, then displays the form as an embedded message into the moderator server for Discord Nations.

## Dn-bot.js
This is the file with the code for the bot which can do multiple actions (in development):
  - Return player's military statistics
  - Allow moderator to update economics, research, military sheets from Discord
  - Allow moderator to refresh Nation Tracker based on country roles assigned
  - Return links to spreadsheets
Planned Additions
  - Return graphs on economics and military statistics for a country
  - Rank players' abilities based on economic and military improvements
  - Account for export and import quantities like those in the Observatory of Economic Complexity
This uses the Google API for Sheets, Drive, and the Discord API on Node.js and will be run on a Raspberry Pi when ready for deployment.
