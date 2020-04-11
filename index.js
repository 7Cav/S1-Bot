/*    
    Discord Bot for 7th Cavalry S1 Department.

    Made by Vex
*/

// Libraries
const Discord = require('discord.js');
const fs = require('fs');
const moment = require('moment'); // Documentation: https://momentjs.com/

//Locals
const config = require('./src/config/main.json');
const Person = require('./src/personnel.js');
const {getData} = require('./src/GoogleSheets.js');

// Bot initilization
const bot = new Discord.Client();
const botLogin = config.Login;

bot.on('ready', () => {
    console.log('Connected as ' + bot.user.tag);
    bot.user.setActivity('7cav.us/enlist', {type: 3});
})

const prefix = '!'; // Command prefix
const p = new Person();

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

        //#region S1 commands
        if(msg.content.startsWith('!S1')) {
            // !S1
            if(args[0] == null) {
                // If !Personnel is done with no 2ndary command,
                // Then send them the command list.
                var help = new Discord.MessageEmbed()
                .setColor('#F5CC00')
                .setThumbnail('https://images.7cav.us/7Cav-small.png')
                .setTitle('Commands:')
                .addField('!S1 time DD/MM/YYYY', 'Gets the difference in days or months between now and the specified time.')
                .addField('!S1 promo', 'Gets the promotions of the week')
                .setTimestamp()
            msg.channel.send(help)
            }

            // Time command and options
            if(args[0] == 'time') {
                if(args[1] == null) {
                    msg.reply('Syntax: !Personnel time DD/MM/YYYY');
                    return;
                } else if(args[1] == 'now') {
                    msg.reply(`Today is ${p.getToday()} \n ${moment().add(1, 'days').calendar()} is in 24 hours`);
                    return;
                } else if(args[1] == 'week')
                {
                    msg.reply(`Today is ${p.getToday()} \n ${moment().add(7, 'days').calendar()} is ${p.getDifference()}`);
                } else {
                    msg.reply(`Today is ${p.getToday()} \n ${args[1]} is ${p.getDifference()}`);
                }
            }
            
            // Promotions
            if(args[0] == 'promo') {
                if(msg.author.roles.has(config.DiscordRoles.S1Command || config.DiscordRoles.S6)) {
                    if(args[1] == 'login') {
                        getData();
                    }
                }
            }

            if(args[0] == 'add') {
                //if(msg.author.roles.has(config.DiscordRoles.S1Command || config.DiscordRoles.S6)) {
                    var user = p.add(args[1], args[2])
                    msg.reply(user);
                //}
            }
        }
        //#endregion
    }
})

bot.login(botLogin);