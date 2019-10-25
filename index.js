const Discord = require("discord.js");
const Self = new Discord.Client();
const config = require("./config.json");
const token = config.token;
const prefix = config.prefix;

Self.on("ready", function(){
console.log(`Le self est connecté au compte ${Self.user.tag}`)

})
