const moment = require('moment');
const fs = require('fs');
const config = require('./config/main.json');

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

    //TODO: Create promotion finder: https://github.com/7Cav/CAV-Promotion-GCM/blob/master/Personnel.py#L65
    // Get all possible promotions up until input date.
    // pfcArr = [];
    // spcArr = [];
    // cplArr = [];

    // TODO: Write to file for promotions: https://github.com/7Cav/CAV-Promotion-GCM/blob/master/Personnel.py#L344
}

module.exports = Person