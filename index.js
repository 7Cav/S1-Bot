/*    
    Discord Bot for 7th Cavalry S1 Department.

    Made by Vex
*/

// Libraries
const Discord = require('discord.js');
const fs = require('fs');
const moment = require('moment');

//Locals
const config = require('./src/config/main.json');
const Person = require('./src/personnel.js');

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
        if(msg.content.startsWith('!online'))
        {
            // respond if bot is online
            msg.reply('S1 bot is online!');
        }

        if(msg.content.startsWith('!S1')) {
            if(args[0] == null) {
                // If !Personnel is done with no 2ndary command,
                // Then send them the command list.
                var help = new Discord.MessageEmbed()
                .setColor('#F5CC00')
                .setThumbnail('https://images.7cav.us/7Cav-small.png')
                .setTitle('Commands:')
                .addField('!online', 'Checks to see if bot is responsive')
                .addField('!S1 time DD/MM/YYYY', 'Gets the difference in days or months between now and the specified time.')
                .setTimestamp()
            msg.channel.send(help)
            }

            if(args[0] == 'time') {
                // !Personnel time
                if(args[1] == null) {
                    msg.reply('Syntax: !Personnel time DD/MM/YYYY')
                } else {
                    // Create a new Person() and pass args[1] (DDD/MM/YYYY)
                    const p = new Person(args[1]);
                    msg.reply(`Today is ${p.getToday()} \n ${args[1]} is ${p.getDifference()}`);
                }
            }
        }
    }
})

bot.login(botLogin);