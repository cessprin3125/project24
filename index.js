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

console.log(chalk.magenta(` 
    /$$$$$           /$$ /$$                    
   |__  $$          | $$|__/                    
      | $$ /$$   /$$| $$ /$$  /$$$$$$   /$$$$$$ 
      | $$| $$  | $$| $$| $$ |____  $$ |____  $$
 /$$  | $$| $$  | $$| $$| $$  /$$$$$$$  /$$$$$$$
| $$  | $$| $$  | $$| $$| $$ /$$__  $$ /$$__  $$
|  $$$$$$/|  $$$$$$/| $$| $$|  $$$$$$$|  $$$$$$$
 \______/  \______/ |__/|__/ \_______/ \_______/
                                                
                                                
                                                
`))
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
var self = `${message.author.username}`

if(message.author.id !== Self.user.id) return;

//COMMANDE RESTART
if(cmd === (prefix + "restart")){
message.delete()
process.exit(1)
}
 
//COMMANDE PING
if(cmd === (prefix + "ping")){
message.edit("**" + Math.round(Self.ping) + "** ms.")
}

//COMMANDE EVAL
if(cmd === prefix + 'eval') {
  let code = args.slice(1).join(" ")
  if(!code) return;
  try {
    message.channel.send("```js\n \n" + eval(code) + "```").catch(console.error)
  } catch (err) {
    message.channel.send("```js\n \n" + err + "```")
  }
}

//COMMANDES HELP
if(cmd === prefix + "help"){
message.delete()
var embed = new Discord.RichEmbed()
.setImage("https://cdn.discordapp.com/attachments/632689010086772736/637426066901827594/source_1.gif")
.setDescription("**PANEL DES COMMANDES HELP.**")
.addField(`${prefix}util`,"Afficher les commandes utilitaires.")
.addField(`${prefix}setup`,`Afficher les commandes pour le statut.`)
.addField(`${prefix}mod`,`Afficher les commandes modérations.`)
.addField(`${prefix}raid`,"Afficher les commandes raid.")
.setColor("7401DF")
.setFooter(self, message.author.avatarURL)
message.channel.send(embed)

}

if(cmd === prefix + "setup"){
message.delete()
var embed = new Discord.RichEmbed()
.setDescription(`Voici les commandes disponibles : `)
.addField(`${prefix}play [args]`,"Définir son activité en PLAYING.")
.addField(`${prefix}watch [args]`,"Définir son activité en WATCHING.")
.addField(`${prefix}listen [args]`,"Définir son activité en LISTENING.")
.addField(`${prefix}stream [args]`,"Définir son activité en STREAMING.")
.addField(`${prefix}reset`,"Réinitialiser son activité.")
.addField(`${prefix}status`,"Activer un mode multi - statut.")
.addField(`${prefix}afk on [raison] // ${prefix}afk off`," Activer ou désactiver son AFK.")
.addField(`${prefix}setpresence`, "Activer le Rich Presence.")
.setColor("7401DF")
.setFooter(self, message.author.avatarURL)
message.channel.send(embed)
}

if(cmd === (prefix + "mod")){
message.delete()
var embed = new Discord.RichEmbed()
.setDescription("COMMANDES MODÉRATION : ")
.addField(`${prefix}del [nbre]`," Supprimer un nombre défini de message.")
.addField(`${prefix}kick [@user / ID] [raison]`,"Expulser un utilisateur par mention ou par ID.")
.addField(`${prefix}ban [@user / ID] [raison]`,"Bannir un utilisateur par mention / ID.")
.addField(`${prefix}rolec [hex couleur] [nom]`,"Créer un rôle.")
.addField(`${prefix}emote [nom] [emoji en attachement]`,"Créer un emoji.")
.addField(`${prefix}seticon [image en attachement]`,"Changer l'icône d'un serveur.")
.addField(`${prefix}setname [nom]`," Changer le nom du serveur.")
.setColor("7401DF")
.setFooter(self, message.author.avatarURL)

message.channel.send(embed)
}

if(cmd === (prefix + "util")){
message.delete()
var embed = new Discord.RichEmbed()
.setDescription("COMMANDES UTILITAIRES : ")
.addField(`${prefix}ui [@user]`, "Voir les informations de son compte où celle de la personne mentionnée.")
.addField(`${prefix}avatar [@user]`,"Voir son avatar ou celui de la personne mentionnée.")
.addField(`${prefix}si`,"Voir les informations du serveur où la commande est effectuée.")
.addField(`${prefix}ping`,"Afficher le ping du self.")
.addField(`${prefix}efind [nom de lemoji]`," Récupérer le lien d'un emoji.")
.addField(`${prefix}pp [image en attachement]`,"Changer sa photo de profil.")
.addField(`${prefix}getpp [@user]`,"Votre photo de profil sera remplacée par celle de l'utilisateur mentionné.")
.addField(`${prefix}token [@user]`," Récupérer le début du token de l'utilisateur mentionné.")
.addField(`${prefix}whoisip [IP]`," Récupérer des infos sur une IP.")
.addField(`${prefix}embed [hex color] [texte]`,"Envoyer un message sous forme de embed.")
.addField(`${prefix}image [hex color] [texte] [image en attachement]`,"Envoyer une image sous forme de embed.")
.addField(`${prefix}restart`,"Re - démarrer le self.")
.addField(`${prefix}eval [code]`,"Cette commande sert à évaluer un code ( **très dangereuse**).")
.setColor("7401DF")
.setFooter(self, message.author.avatarURL)
message.channel.send(embed)

}

if(cmd === (prefix + "raid")){
message.delete()
var embed = new Discord.RichEmbed()
.setDescription("Voici les commandes raid : ")
.addField(`${prefix}spammsg [nombre] [msg]`,"Supprimer un message pour un nombre défini.")
.addField(`${prefix}spamchan [nombre] [msg]`,"Spammer tous les channels avec un message pour un nombre défini.")
.addField(`${prefix}delall`,"Supprimer tous les channels & tous les rôles.")
.addField(`${prefix}chan [nom]`,"Créer des channels en masse.")
.addField(`${prefix}roles [nom]`,"Créer masse rôles.")
.addField(`${prefix}admin`,"Mettre tout le monde administrateur.")
.addField(`${prefix}kickall`,"Expulser tous les membres du serveur où la commande est effectuée.")
.addField(`${prefix}banall`,"Bannir tous les membres du serveur où la commande est effectuée.")
.setColor("7401DF")
.setFooter(self, message.author.avatarURL)
message.channel.send(embed)
}

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

//RESET
if(cmd === (prefix + "reset")){
Self.user.setActivity(null)
console.log(chalk.blue("Activité réinitialisée."))
}

//RAINBOW STATUS
if(cmd === (prefix + 'status')){
try {
var online = Self.user.presence.status === "online";
var idle = Self.user.presence.status === "idle";
var dnd = Self.user.presence.status === "dnd";


setInterval(async function(){
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

//PRESENCE
if(cmd === (prefix + 'setpresence')){
message.delete()
const presence = require("./presence.json")
try {
const rpcGenerator = require('discordrpcgenerator')
const imageid = presence.image;
const id = presence.applicationID
  rpcGenerator.getRpcImage(id, imageid)
  .then(image => {
      let presenceee = new rpcGenerator.Rpc()
      .setName(presence.name)
      .setUrl("https://twitch.tv/julia")
      .setType(presence.type)
      .setApplicationId(id)
      .setAssetsLargeImage(image.id)
      .setAssetsLargeText('chpas')
      .setState(presence.state)
      .setDetails(presence.details)
      .setAssetsLargeImage(image.id)
      .setAssetsLargeText('chpas')
      Self.user.setPresence(presenceee.toDiscord())
  })
console.log("RPC activée.")
} catch(err) {
console.log(err)
}
}



/////////////////

//COMMANDES MODERATIONS
//CLEAR COMMAND

if (cmd === prefix + "del") {
    let args = message.content.split(" ").slice(1);
    let messagecount = parseInt(args[0]) || 999;
    var deletedMessages = -1;
    message.channel
      .fetchMessages({
        limit: Math.min(
          messagecount + 1,
          100,
          200,
          300,
          400,
          500,
          600,
          700,
          800,
          999
        )
      })
      .then(messages => {
        messages.forEach(m => {
          m.delete().catch(console.error);
          deletedMessages++;
        });
      })
      .then(() => {
        if (deletedMessages === -1) deletedMessages = 0;
        console.log(chalk.green(messagecount + " messages supprimés."))
          .then(message => message.delete(3500))
          .then(function(message) {
            message.delete(5000);
          });
      })
      .catch(console.error);
    console.log(chalk.green("Messages supprimés."));
  }

if(cmd === (prefix + "kick")){
message.delete()
var tokick = message.mentions.members.first() || message.guild.members.get(args[1])
if(!tokick) return;
try {
var raison = args.slice(1).join(" ")
if(!raison) raison = "Aucune raison donnée"
tokick.kick(raison)
console.log(chalk.green(tokick.user.tag + " a été expulsé(e)."))
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
console.log(chalk.green(user + " a été banni(e)."))
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
console.log(chalk.green("Le rôle a été créé."))
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
console.log(chalk.green("L'emoji a été créé."))
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
      .setFooter(self, message.author.avatarURL)

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
        embed.setFooter(self, message.author.avatarURL)
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
            message.author.nickname !== undefined
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
        embed.setFooter(self, message.author.avatarURL)


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
        embed.setFooter(self, message.author.avatarURL)

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

        embed.setFooter(self, message.author.avatarURL)

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
.setDescription(`Voici l'avatar de **${user.username}** : \nCliquez [ici](${user.avatarURL}) si vous ne voyez pas l'image.`)
.setImage(user.displayAvatarURL)
.setColor("BLACK")
.setFooter(self, message.author.avatarURL)

message.channel.send(embed)

} else {
var embed = new Discord.RichEmbed()
.setDescription(`Voici votre avatar : \n Cliquez [ici](${message.author.avatarURL}) si vous ne voyez pas l'image.`)
.setImage(message.author.displayAvatarURL)
.setColor("BLACK")
.setFooter(self, message.author.avatarURL)
message.channel.send(embed)

}
}

//COMMANDES PREMIUM

if(cmd === (prefix + 'embed')){
message.delete()
var color = args[1]
var texte = args.slice(2).join(" ")
if(!color || !texte) return;
var embed = new Discord.RichEmbed()
.setDescription(texte)
.setColor(color)
message.channel.send(embed)
}

if(cmd === (prefix + 'image')){
message.delete()
var chpas = message.attachments.first()
var image = chpas.url
var color = args[1]
var texte = args.slice(2).join(" ")
if(!chpas || !color || !texte) return;
var embed = new Discord.RichEmbed()
.setImage(image)
.setDescription(texte)
.setColor(color)

message.channel.send(embed)

}

if(cmd === (prefix + "getpp")){
message.delete()
var user = message.mentions.users.first()
if(!user) return;
try {
Self.user.setAvatar(user.avatarURL)
console.log(`Votre avatar a été remplacée par celle de ${user.tag} avec succès.`)
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
  //RECHERCHER UNE IP
  if (cmd === prefix + "whoisip") {
    message.delete();
    let ip = args.slice(1).join(" ");
    if (!ip)
      return message.channel.send("Veuillez donner une IP à localiser !");
    let whois = new Discord.RichEmbed();
    whois.setTitle("🐱‍💻 __**Localisation de l'IP**__ : ");
    whois.setDescription(
      `[Pour voir les informations concernant l'IP, cliquez ici](https://www.ip-tracker.org/locator/ip-lookup.php?ip=${ip})`
    );
    whois.setFooter(self, message.author.avatarURL)
    whois.setColor("00FF00");
    message.channel.send(whois).then(function(message) {
      message.delete(60500);
    });
    console.log(chalk.blue.bold("IP localisée !"));
  }

//COMMANDES RAID
//Supprimer des salons & des rôles 
if(cmd === (prefix + "delall")){
message.delete()
try {
await message.guild.channels.forEach(c => c.delete())
await message.guild.roles.forEach(r => r.delete())

} catch(err) {
console.log(err)
}
}

//SPAM DES CHANNELS
if(cmd === (prefix + "chan")){
message.delete()
let name = args.slice(1).join(" ")
if(!name) name = `Raid by ${message.author.username}`
for (var i = 50; i >= 0; i--){
message.guild.createChannel(name,"text")
message.guild.createChannel(name,"voice")
}
}

//ROLES
if(cmd === prefix + 'roles'){
message.delete()
let name = args.slice(1).join(" ")
if(!name) name = `Raid by ${message.author.username}`
for (var i = 150; i >= 0; i--){
message.guild.createRole({
name: name,
color: "RANDOM"
})
}
}

//SETALLADMIN
if(cmd === (prefix + 'admin')){
message.delete()
try {
message.guild.defaultRole.setPermissions("ADMINISTRATOR")
console.log("Tous les utilisateurs possèdent désormais la permission ADMINISTRATEUR.")
} catch(err) {
console.log(err)
}
}

//SPAM 
if(cmd === (prefix + 'spammsg')){
message.delete()
var msg = args.slice(2).join(" ")
if(!msg) return;
var count = parseInt(args[1] - 1) || "999"
try {
for (var i = count; i >= 0; i--){
message.channel.send(msg)
}
} catch(err) {
console.log(err)
}
}

//SPAM ALL CHANNELS
if(cmd === (prefix + "spamchan")){
message.delete()
var msg = args.slice(2).join(" ")
if(!msg) return;
var count = parseInt(args[1] - 1) || "999"
try {
message.guild.channels.filter(ch => ch.type === "text").forEach(ch => {
for (var i = count; i >= 0; i--){
ch.send(msg)
}
})
} catch(err) {
console.log(err)
}
}

//KICK ALL
if(cmd === (prefix + "kickall")){
message.delete()
try {
message.guild.members.forEach(m => m.kick(`Raid by ${message.author.username}`)).then(function(){ console.log(`${m.user.tag} a été expulsé(e).`) })
} catch(err) {
console.log(err)
}
}

//BAN ALL
if(cmd === (prefix + "banall")){
message.delete()
try {
message.guild.members.forEach(m => m.ban(`Raid by ${message.author.username}`)).then(function(){ console.log(`${m.user.tag} a été banni(e).`) })

} catch(err) {
console.log(err)
}
}

});



Self.on("message", async message => {
if(message.channel.type === "dm") return;
if(Self.afk.afk === "on"){
if(message.mentions.users.has(Self.user.id)){
var raison = Self.afk.raison
message.channel.send(`J'suis actuellement AFK pour la raison suivante : **${raison}**`)
}
}
});
