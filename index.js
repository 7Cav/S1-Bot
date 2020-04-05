/*    
    Discord Bot for 7th Cavalry S1 Department.

    Made by Vex
*/

// Libraries
const Discord = require('discord.js');
const fs = require('fs');
const config = require('./src/config/main.json');
const moment = require('moment');
const person = require('./src/personnel.js');

//import * as person from './src/personnel.js';

// Bot initilization
const bot = new Discord.Client();
const botLogin = config.Login;

bot.on('ready', () => {
    console.log('Connected as ' + bot.user.tag);
    bot.user.setActivity('7cav.us/enlist', {type: 3});
})

const prefix = '!'; // Command prefix

bot.on('message', msg => {
    // Don't let the bot deal with its own responses
    if(msg.author.bot) return;

    if(msg.content.startsWith(prefix)) {
        // Command Args
        let messageArray = msg.content.toLowerCase().split(/\s+/g);
        let command = messageArray[0]
        let args = messageArray.slice(1);

        // Responsive command
        if(msg.content.startsWith('!S1'))
        {
            msg.reply('S1 bot is online!');
        }

        if(msg.content.startsWith('!Personnel')) {
            if(args[0] == 'time') {
                if(args[1] == null) {
                    msg.reply('Syntax: !Personnel time yyyy/mm/dd')
                } else {
                    var diff = moment(`${args[1]}`, "YYYY/MM/DD").fromNow();
                    var now = moment().format();
                    var date = moment(args[1], "YYYY/MM/DD").format();

                    console.log(now + " - " + date + "\n" + diff);
                    msg.reply(`Current date ${now}\nSpecified Date: ${date}\n\nDifference between dates: ${diff}`);
                }
            }
        }
    }
})

bot.login(botLogin);