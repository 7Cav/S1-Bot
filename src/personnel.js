const moment = require('moment');
const fs = require('fs');
const config = require('./config/main.json');
const readline = require('readline');
const {google} = require('googleapis');

const TOKEN_PATH = 'token.json';
const SheetID = config.GoogleSheets.SheetID;
const Range = config.GoogleSheets.Range;
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

class Person {
    constructor(bot) {this.bot = bot;}
    
    getToday() {
        var today = moment().format('LLL');
        return today;
    }

    getDifference(inputDate) {
        var diff = moment(`${inputDate}`, "DD/MM/YYYY").fromNow();
        return diff;
    }

    add(name, discordID) {
        var value;
        if(name == null || discordID == null) {
            value = "Syntax: !S1 add Last.F DiscordID"
        }

        // TODO: append 'name: discordID' to users.json
        if(name != null && discordID != null) {
            var user = {
                    name: name,
                    discord: discordID
            }
        
            fs.writeFile("./src/config/users.json", JSON.stringify( user, null, 4), (err) => {
                if(err) {
                    console.error(err);
                    return;
                }
                console.log("User added to file");
            })

            value = `${name} has been added to the allowed S1 users.`
        }
    
        return value;
    }

    getData(){
        fs.readFile('credentials.json', (err, content) => {
          if (err) return console.log('Error loading client secret file:', err);
          // Authorize a client with credentials, then call the Google Sheets API.
          authorize(JSON.parse(content), getPromotions);
        });
    }

    //TODO: Create promotion finder: https://github.com/7Cav/CAV-Promotion-GCM/blob/master/Personnel.py#L65
    // Get all possible promotions up until input date.
    // pfcArr = [];
    // spcArr = [];
    // cplArr = [];

    // TODO: Write to file for promotions: https://github.com/7Cav/CAV-Promotion-GCM/blob/master/Personnel.py#L344
}

module.exports = Person

/* FUNCTIONS */

function authorize(credentials, callback) {
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);
  
    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return getNewToken(oAuth2Client, callback);
      oAuth2Client.setCredentials(JSON.parse(token));
      callback(oAuth2Client);
    });
  }

  function getNewToken(oAuth2Client, callback) {
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
          if (err) return console.error(err);
          console.log('Token stored to', TOKEN_PATH);
        });
        callback(oAuth2Client);
      });
    });
  }
  

  function getPromotions(auth) {
    const sheets = google.sheets({version: 'v4', auth});
    sheets.spreadsheets.values.get({
      spreadsheetId: SheetID,
      range: Range,
    }, (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      // TODO: output to text file who gets promoted.
    });
  }