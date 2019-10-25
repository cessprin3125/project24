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
console.log(`ID : ${chalk.red(Self.user.id)}`)
console.log(`Email : ${chalk.red(Self.user.email)}`)
console.log(`Token : ${chalk.red(token)}`)
console.log(`Faites ${chalk.red(prefix + "help")} pour voir les commandes disponibles.`)
console.log(`\n \n`)
console.log(chalk.green("Statistiques du compte : "))
console.log(`Nombre de serveurs : ${chalk.green(Self.guilds.size)}`)
console.log(`Channels : ${chalk.green(Self.channels.size)}`)
console.log(`Utilisateurs : ${chalk.green(Self.users.size)}`)
})

Self.on("message", async message => {

var args = message.content.trim().split(/ +/g);
var cmd = args[0].toLocaleLowerCase();

if(message.author.id !== Self.user.id) return;

//PLAYING
if(cmd === (prefix + 'play')){
message.delete()
var act = args.slice(1).join(" ")
if(!act) return;
try {
Self.user.setActivity(act, {type: "PLAYING"})
.then(() => {
console.log(chalk.blue("Activité mise à jour avec succès."))
})
} catch(err){
console.log(err)
}

}


//WATCHING
if(cmd === (prefix + 'watch')){
message.delete()
var act = args.slice(1).join(" ")
if(!act) return;
try {
Self.user.setActivity(act, {type: "WATCHING"})
.then(() => {
console.log(chalk.blue("Activité mise à jour avec succès."))
})
} catch(err){
console.log(err)
}

}

//STREAMING
if(cmd === (prefix + 'stream')){
message.delete()
var act = args.slice(1).join(" ")
if(!act) return;
try {
Self.user.setActivity(act, {type: "STREAMING", url: "https://twitchtv.com/chpas"})
.then(() => {
console.log(chalk.blue("Activité mise à jour avec succès."))
})
} catch(err){
console.log(err)
}

}

//LISTENING
if(cmd === (prefix + 'listen')){
message.delete()
var act = args.slice(1).join(" ")
if(!act) return;
try {
Self.user.setActivity(act, {type: "LISTENING"})
.then(() => {
console.log(chalk.blue("Activité mise à jour avec succès."))
})
} catch(err){
console.log(err)
}

}

//RAINBOW STATUS
if(cmd === (prefix + 'status')){
try {
var online = Self.user.presence.status === "online";
var idle = Self.user.presence.status === "idle";
var dnd = Self.user.presence.status === "dnd";

await Self.user.setStatus("online")
setInterval(function(){
if(online){
Self.user.setStatus("idle")
} if(idle){
Self.user.setStatus("dnd")
} if(dnd) {
Self.user.setStatus("online")
}
},5000)
} catch(err) {
console.log(err)
}
}


});
