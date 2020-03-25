/*
    Discord Bot for 7th Cavalry S1 Department.

    Made by Vex
*/

// Libraries
const Discord = require('discord.js');
const fs = require('fs');
const config = require('./config/main.json');

// Bot initilization
const bot = new Discord.Client();
const botLogin = config.Login;

bot.on('ready', () => {
    console.log('Connected as' + bot.user.tag);
})

bot.on('message', msg => {
    // Don't let the bot deal with its own responses
    if(msg.author.bot) return;

    // Responsive command
    if(msg.content.startsWith('!S1'))
    {
        msg.reply('S1 bot is online!');
    }
})

bot.login(botLogin);