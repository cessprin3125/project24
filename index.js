const Discord = require("discord.js");
const Self = new Discord.Client();
const config = require("./config.json");
const token = config.token;
const prefix = config.prefix;

const chalk = require("chalk")

Self.login(token).catch(() => console.log("Le token que vous avez saisi est invalide."))

Self.on("ready", function(){
console.log(chalk.red(`Le self est connecté au compte ${Self.user.tag}`))
console.log(`Pseudo : ${chalk.red(Self.user.username)}`)
console.log(`Email : 
)
})
