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


//AFK COMMANDES
if(cmd === (prefix + "afk")){
if(message.content.startsWith(prefix + "afk on")){
message.delete()
let raison = args.slice(1).join(" ")
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
}

if(Self.afk[afk] === "off" return;
if(!Self.afk[afk] return;
}

//CLEAR COMMAND
if(cmd === (prefix + "del")){
var count = parseInt(args[1] + 1) 
if(!count) count = 999;

message.channel.fetchMessages({limit: count})
.then(messages => messages.forEach(m => m.delete()))
console.log(count + " messages supprimés.")

}

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
        embed.setFooter(self, "https://cdn.discordapp.com/avatars/541698401381646346/80b258f8fd9c6d07424c9210b6a64653.png?size=2048");

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
        embed.setFooter(self, "https://cdn.discordapp.com/avatars/541698401381646346/80b258f8fd9c6d07424c9210b6a64653.png?size=2048");

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
        embed.setFooter(self, "https://cdn.discordapp.com/avatars/541698401381646346/80b258f8fd9c6d07424c9210b6a64653.png?size=2048");

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
        embed.setFooter(self, "https://cdn.discordapp.com/avatars/541698401381646346/80b258f8fd9c6d07424c9210b6a64653.png?size=2048");

        embed.setColor("8000FF");
        message.channel.send(embed).then(function(message) {
          message.delete(120100);
        });
        console.log(chalk.magenta("Infos utilisateurs envoyées !"));
      }
    }

});

Self.on("message", async message => {
if(Self.afk[afk].afk === "on"){

}
});
