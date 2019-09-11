const Discord = require("discord.js");
const ms = require("ms");
var fs = require('fs-extra'); //FileSystem
let conf = JSON.parse(fs.readFileSync("./settings/guilds.json", "utf8")); //Config file

module.exports.run = async (client, message, args) => {
  
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send({
    embed: {
      "title": "No tienes permisos, cariño",
      "color": 0xff2222
    }
  }).then(msg => {
    if (conf[message.guild.id].delete == 'true') {
      msg.delete(conf[message.guild.id].deleteTime);
    }
  });
  
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  
  if (!tomute) return message.channel.send({
    embed: {
      "title": "No se pudo encontrar el usuario :anguished: ",
      "color": 0xff2222
    }
  }).then(msg => {
    if (conf[message.guild.id].delete == 'true') {
      msg.delete(conf[message.guild.id].deleteTime);
    }
  });
  
  let muterole = message.guild.roles.find(r => r.name === "Shhh");
  
  if (!tomute.roles.has(muterole.id)) return message.channel.send({
      embed: {
        "description": `<@${tomute.id}> ya no está muteado o no ha sido muteado`,
        "color": 0xff2222,
        "title": "Error"
      }
    }).then(msg => {
      if (conf[message.guild.id].delete == 'true') {
        msg.delete(conf[message.guild.id].deleteTime);
      }
    });

    tomute.removeRole(muterole.id);
    message.channel.send({
      embed: {
        "description": `<@${tomute.id}> ha sido desmuteado por <@${message.author.id}>!`,
        "color": 0x22ff22,
        "title": "Desmuteado"
      }
    }).then(msg => {
      if (conf[message.guild.id].delete == 'true') {
        msg.delete(conf[message.guild.id].deleteTime);
      }
    });
  
}

exports.config = {
  name: "unmute",
  aliases: []
}