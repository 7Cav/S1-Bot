/*    
    Discord Bot for 7th Cavalry S1 Department.

    Made by Vex
*/

// Libraries
const Discord = require('discord.js');
const fs = require('fs');
const config = require('./src/config/main.json');
const Shop1 = require('./src/personnel.js');

// Bot initilization
const bot = new Discord.Client();
const botLogin = config.Login;

bot.on('ready', () => {
    console.log('Connected as ' + bot.user.tag);1
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

        if(msg.content.toLowerCase().startsWith('!Personnel')) {
            console.log(msg.content);
            // Personnel.ob.ts initilization
            const S1 = new Shop1(`${args[0]}`, `${args[1]}`, `${args[2]}`, `${args[3]}`);
            msg.reply(S1.getMilpac());
            console.log(S1.getMilpac());
        }
    }
})

bot.login(botLogin);