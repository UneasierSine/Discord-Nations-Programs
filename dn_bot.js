const Discord = require('discord.js')
const client = new Discord.Client()

const JSON = require('circular-json')

const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

const sheets = google.sheets({version: 'v4'}) 

var militarySheetId = "EXPUNGED"
var econSheetId = "EXPUNGED"
var nationTrackerSheetId = "EXPUNGED"

var militarySheet, econSheet, nationTrackerSheet;

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Sheets API.
  authorize(JSON.parse(content), setSheets);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      return (oAuth2Client);
    });
  });
}

function setSheets (auth)
{
  militarySheet = sheets.spreadsheets.values.get({spreadsheetId: militarySheetId, range: 'A1:AC1', auth: auth}, function(err, response) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(JSON.stringify(response.data, null, 2));
  })

  econSheet = sheets.spreadsheets.values.get({spreadsheetId: econSheetId, range: 'A1:AK1', auth: auth}, function(err, response) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(JSON.stringify(response.data, null, 2));
  })

  nationTrackerSheet = sheets.spreadsheets.values.get({spreadsheetId: nationTrackerSheetId, range: 'A1:AC1', auth: auth}, function(err, response) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(JSON.stringify(response.data, null, 2));
  })
  console.log("Sheets set.")
}

/**

//check for messages on the server
client.on('message', (receivedMessage) => {
    //check to ensure the message is not for the bot -- if yes then do nothing
    if(receivedMessage.author == client.user) {
        return
    }

    //let the escape character for a command be the =>
    if(receivedMessage.content.startsWith("=>")){
        processCommand(receivedMessage)
    }
})

function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(2) // Remove the first two characters, =>
    let splitCommand = fullCommand.split(" ") // Split the message into pieces by spaces
    let primaryCommand = splitCommand[0] // Parse the main body of the command
    let arguments = splitCommand.splice(1) // Send other words as arguments

    console.log("Command received: " + primaryCommand) // Print command
    console.log("Arguments: " + arguments) // Print arugments
    console.log("User: " + receivedMessage.author) // Print command user
    
    if(primaryCommand == "military"){
        getMilitaryCommand(arguments, receivedMessage) // Call military getter function
    } else if (primaryCommand == "update-tracker"){
        updateTracker(arguments, receivedMessage) // Update Nation Tracker
    }
}

function getMilitaryCommand(arguments, receivedMessage) {
    
    let membersWithRole = receivedMessage.guild.members.filter(member => { return member.roles.find("name", arguments[0]) }).map(member => { return member.user.username})
    // Check if the message sender has the role of the requested military
    if(!(membersWithRole.indexOf(receivedMessage.author.username) > -1)){
        receivedMessage.channel.send("This is not working right")
        return
    } else {
        var rowVals = militarySheet.getRows(worksheet_id = 1, function(err, rows) { console.log(err, rows)})
        console.log(rowVals.col1)
    }
}

function updateTracker(arguments, receivedMessage){

}

var bot_secret_token = "EXPUNGED"
client.login(bot_secret_token)
*/
