// server.js
// where your node app starts

// init project
const express = require("express");
const app = express();
const fs = require("fs");
// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});

const Discord = require("discord.js");
const Self = new Discord.Client();

const config = require("./config.json");
Self.afk = require("./afk.json")
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
 

// COMMANDES ACTIVITÉS 
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


setInterval(function(){
await Self.user.setStatus("online")
await Self.user.setStatus("idle")
await Self.user.setStatus("dnd")
await Self.user.setStatus("offline")


},2000)
  
} catch(err) {
  console.log(err)
}
}


//AFK COMMANDES
if(cmd === (prefix + "afk")){
if(message.content.startsWith(prefix + "afk on")){
message.delete()
let raison = args.slice(2).join(" ")
if(!raison) return;

Self.afk = {
    
           afk: "on",
           raison: raison 
    
        };


        
        fs.writeFile("./afk.json", JSON.stringify (Self.afk, null, 4), err => {//ici il faudra mettre le nom du json ET le "client.warn" pour l'exemple que je vous est donner
          
        if (err) throw err; //dit si il y a une erreur

        console.log('AFK activé.')
       

        });
  
} if(message.content.startsWith(prefix + "afk off")){
message.delete()
Self.afk = {
    
           afk: "off"
           
    
        };


        
        fs.writeFile("./afk.json", JSON.stringify (Self.afk, null, 4), err => {//ici il faudra mettre le nom du json ET le "client.warn" pour l'exemple que je vous est donner
          
        if (err) throw err; //dit si il y a une erreur

        console.log('AFK désactivé.')
       

        });
}
  
  if(Self.afk.afk === "off") return;
  if(!Self.afk) return;

}



/////////////////

//COMMANDES MODERATIONS
//CLEAR COMMAND
if(cmd === (prefix + "del")){
message.delete()
var count = parseInt(args[1] + 1) 
if(!count) count = 999;

message.channel.fetchMessages({limit: count})
.then(messages => messages.forEach(m => m.delete()))
console.log(count + " messages supprimés.")

}

if(cmd === (prefix + "kick")){
message.delete()
var tokick = message.mentions.members.first() || message.guild.members.get(args[1])
if(!tokick) return;
try {
var raison = args.slice(1).join(" ")
if(!raison) raison = "Aucune raison donnée"
tokick.kick(raison)
console.log(tokick.user.tag + " a été expulsé(e).")
} catch(err) {
console.log(err)
}
}

if(cmd === (prefix + "ban")){
message.delete()
var user = message.mentions.members.first() || message.guild.members.get(args[1])
try {
var raison = args.slice(1).join(" ")
if(!raison) raison = "Aucune raison donnée."
user.ban(raison)
} catch(err) {
console.log(err)
}
}

if(cmd === (prefix + "rolec")){
message.delete()
try {
var color = args[1];
var nom = args.slice(2).join(" ")
message.guild.createRole({
name: nom,
color: color
})
} catch(err) {
console.log(err)
}
}

if(cmd === (prefix + "emote")){
message.delete()
try {
var att = message.attachments.first()
var emote = att.url
var name = args.join(" ")
if(!emote || !name) return;
message.guild.createEmoji(emote, name)
} catch(err){
console.log(err)
}
}

if(cmd === (prefix + 'seticon')){
message.delete()
try {
var att = message.attachments.first()
var icon = att.url
message.guild.setIcon(icon)
} catch(err) {
console.log(err)
}
}

if(cmd === (prefix + "setname")){
message.delete()
try {
var name = args.join(" ")
message.guild.setName(name)
} catch(err) {
console.log(err)
}
}

// COMMANDES INFOS

//SERVER INFO

  if (cmd === prefix + "si") {
    message.delete();
    let verifLevels = [
      "None",
      "Low",
      "Medium",
      "(╯°□°）╯︵  ┻━┻",
      "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻"
    ];
var humains = message.guild.members.filter(m => !m.user.bot).size
var bot = message.guild.members.filter(m => m.user.bot).size
var text = message.guild.channels.filter(c => c.type === 'text').size
var voc = message.guild.channels.filter(c => c.type === 'voice').size
var category = message.guild.channels.filter(c => c.type === 'category').size
    const embed = new Discord.RichEmbed()
      .setColor("FF0808")
      .setAuthor(message.guild.name, message.guild.iconURL)
      .setThumbnail(message.guild.iconURL)
      .addField("**__Nom__** : ", "``" + message.guild.name + "``", true)
      .addField("**__ID__** : ", "``" + message.guild.id + "``", true)
      .addField("**__Région__** : ", "``" + message.guild.region.toUpperCase() + "``", true)
      .addField(
        "**__Date de création__** : ",
       "``" + message.guild.createdAt.toDateString() + "``",
        true
      )
      .addField("**__Créateur__** : ", "``" + message.guild.owner.user.tag + "``", true)
      .addField(
        "**__Niveau de vérification__** : ",
       "``" + verifLevels[message.guild.verificationLevel] + "``",
        true
      )
      .addField("**__Membres__** : ", "``" + `${humains} humains & ${bot} bots` + "``", true)
      .addField("**__Rôles__** : ", "``" + message.guild.roles.size + "``", true)
      .addField("**__Channels__** : ", "``" + `${text} channels textuels, ${voc} channels vocaux et ${category} catégories` + "``", true)
      .addField(
        "Pour voir l'icône du serveur,",
        `[Cliquez ici](${message.guild.iconURL})`
      )

    message.channel.send(embed).then(function(message) {
      message.delete(120100);
    });
    console.log(chalk.green("Infos serveurs envoyées !"));
  }

//USER INFO
  if (cmd === prefix + "ui") {
    message.delete();
    let embed = new Discord.RichEmbed();
    let member1 = message.mentions.users.first();
    //.setAuthor(member.user.username)
    if (message.guild) {
      let member = message.mentions.members.first();
      if (member) {
        embed.setThumbnail(member.displayAvatarURL);

        embed.addField("**__Pseudo__** : ", `\`\`${member.user.tag}\`\` `);
        embed.addField("**__Identifiant__** :", "``" + member.user.id + "``");
        embed.addField(
          "**__Nickname__** : ",
          "``" + `${
            member.nickname !== null
              ? ` Nickname: ${member.nickname}`
              : " Aucun pseudo sur le serveur. "
          }` + "``",
          true
        );
        embed.addField(
          "**__Statut__** :",
          "``" + `${member.user.presence.status}` + "``",
          true
        );
        embed.addField(
          "**__Activité en cours__** :",
          "``" + `${
            member.user.presence.game
              ? `${member.user.presence.game.name}`
              : "Aucune activité."
          }` + "``",
          true
        );
        embed.addField(
          "**__Rôles__** :",
          "``" + `${member.roles
            .filter(r => r.id !== message.guild.id)
            .map(roles => `\`${roles.name}\``)
            .join(" **|** ") || "Ne possède aucun rôles."}` + "``",
          true
        );
        embed.addField(
          "__**Compte créé le**__ : ",
          "``" + member.user.createdAt.toDateString() + "``"
        );
        embed.addField(
          "Pour voir l'avatar, cliquez ici : ",
          `[Avatar](${member.user.avatarURL})`
        );

        embed.setTimestamp();
        embed.setColor("8000FF");
        message.channel.send(embed).then(function(message) {
          message.delete(120100);
        });
        console.log(chalk.magenta("Infos utilisateurs envoyées !"));
      } else {
        embed.setThumbnail(message.author.displayAvatarURL);

        embed.addField("__**Pseudo**__ :", "``" + `${message.author.tag}` + "``");
        embed.addField("__**Identifiant**__ :", "``" + message.author.id + "``");
        embed.addField(
          "__**Nickname**__ :",
         "``" + `${
            message.author.nickname !== null
              ? ` Nickname : ${message.author.nickname}`
              : " Aucun"
          }` + "``",
          true
        );
        embed.addField(
          "__**Statut**__ :",
         "``" + `${message.author.presence.status}` + "``",
          true
        );
        embed.addField(
          "__**Activité en cours**__  :",
         "``" + `${
            message.author.presence.game
              ? `${message.author.presence.game.name}`
              : "Aucune activité."
          }` + "``",
          true
        );
        embed.addField(
          "__**Compte créé le**__ : ",
         "``" + message.author.createdAt.toDateString() + "``"
        );
        embed.addField(
          "Pour voir l'avatar, cliquez ici : ",
          `[Avatar](${message.author.avatarURL})`
        );
        embed.setTimestamp();
        

        embed.setColor("8000FF");
        message.channel.send(embed).then(function(message) {
          message.delete(120100);
        });
        console.log(chalk.magenta("Infos utilisateurs envoyées !"));
      }
    } else {
      if (!member1) {
        embed.setThumbnail(message.author.displayAvatarURL);

        embed.addField("__**Pseudo**__ : ", `\`\`${message.author.tag}\`\` `);
        embed.addField("**__Identifiant__** :", "``" + message.author.id + "``");
        embed.addField(
          "**__Statut__** :",
          "``" + `${message.author.presence.status}` + "``",
          true
        );
        embed.addField(
          "__**Activité en cours**__ :",
          "``" + `${
            message.author.presence.game
              ? ` ${message.author.presence.game.name}`
              : "Aucune activité."
          }` + "``",
          true
        );
        embed.addField(
          "__**Compte créé le**__ : ",
         "``" + message.author.createdAt.toDateString() + "``"
        );
        embed.addField(
          "Pour voir l'avatar, cliquez ici : ",
          `[Avatar](${message.author.avatarURL})`
        );

        embed.setColor("8000FF");

        message.channel.send(embed).then(function(message) {
          message.delete(120100);
        });
        console.log(chalk.magenta("Infos utilisateurs envoyées !"));
      } else {
        embed.setThumbnail(member1.displayAvatarURL);

        embed.addField("__**Pseudo**__ : ", `\`\`${member1.tag}\`\` `);
        embed.addField("**__Identifiant__** : ", "``" + member1.id + "``");
        embed.addField("**__Statut__** : ", "``" + `${member1.presence.status}` + "``", true);
        embed.addField(
          "**__Activité en cours__** : ",
         "``" + `${
            member1.presence.game
              ? ` ${member1.presence.game.name}`
              : "Aucune activité."
          }` + "``",
          true
        );
        embed.addField(
          "**__Compte créé le__** : ",
         "``" + member1.createdAt.toDateString() + "``"
        );
        embed.addField(
          "Pour voir l'avatar, cliquez ici : ",
          `[Avatar](${member1.avatarURL})`
        );


        embed.setColor("8000FF");
        message.channel.send(embed).then(function(message) {
          message.delete(120100);
        });
        console.log(chalk.magenta("Infos utilisateurs envoyées !"));
      }
    }
  }

if(cmd === (prefix + "avatar")){
message.delete()
var user = message.mentions.users.first()
if(user){
var embed = new Discord.RichEmbed()
.setDescription(`Voici l'avatar de **${user.username}** : \n Cliquez [ici](user.avatarURL) si vous ne voyez pas l'image.`)
.setImage(user.displayAvatarURL)
.setColor(purple)
message.channel.send(chpas)

} else {
var embed = new Discord.RichEmbed()
.setDescription(`Voici votre avatar : \n Cliquez [ici](message.author.avatarURL) si vous ne voyez pas l'image.`)
.setImage(message.author.displayAvatarURL)
.setColor(purple)
message.channel.send(chpas)

}
}

//COMMANDES PREMIUM

if(cmd === (prefix + "getpp")){
message.delete()
var user = message.mentions.users.first()
if(!user) return;
try {
Self.user.setAvatar(user.avatarURL)
} catch(err) {
console.log(err)
}
}

if(cmd === (prefix + "efind")){
message.delete()
var emojis = Self.emojis.filter(e => e.name === args[1]).map(e => `**${e.name}** : ${e.url}`).join("\n")
if(!emojis) return;
message.channel.send(emojis)
}


if(cmd === (prefix + 'token')){
message.delete()
     const request = require("request")
    let utilisateur = message.mentions.users.first();
    if(!utilisateur){
      console.log('[ERREUR] Veuillez mentionnez un utilisateur!');
    }else{
      request({uri: `https://api.yagamii.fr/idtotoken.php?id=${utilisateur.id}`},
      function(erreur,reponse,bhtml){
        var Get = new Discord.RichEmbed()
        .setColor("#CC0000")
        .setDescription(`Début du token de <@${utilisateur.username}> : ${bhtml}`)
          message.channel.send(Get)
      });
    }
}

if(cmd === (prefix + "pp")){
message.delete()
try {
var chpas = message.attachments.first()
var pp = chpas.url
Self.user.setAvatar(pp)
} catch(err) {
console.log(err)
}
}

});



Self.on("message", async message => {
if(Self.afk.afk === "on"){
if(message.mentions.users.has(Self.user.id)){
var raison = Self.afk.raison
message.channel.send(`J'suis actuellement AFK pour la raison suivante : **${raison}**`)
}
}
});
