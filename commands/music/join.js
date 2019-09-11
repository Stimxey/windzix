const Discord = require("discord.js");
var fs = require('fs-extra'); //FileSystem
let conf = JSON.parse(fs.readFileSync("./settings/guilds.json", "utf8")); //Config file

exports.run = (client, message, args, ops) => {
  
  if (!message.member.hasPermission("MOVE_MEMBERS")) return message.channel.send({
    embed: {
      "description": "Negado!",
      "color": 0xff2222,
      "title": "Error"
    }
  }).then(msg => {
    if (conf[message.guild.id].delete == 'true') {
      msg.delete(conf[message.guild.id].deleteTime);
    }
  });
  
  const voiceChannel = message.member.voiceChannel;
  if (message.guild.me.voiceChannel) {
    return message.channel.send({
      embed: {
        "title": "Lo sentimos, el bot ya está en el canal de voz!",
        "color": 0xff2222
      }
    }).then(msg => {
      if (conf[message.guild.id].delete == 'true') {
        msg.delete(conf[message.guild.id].deleteTime);
      }
    });
  }
  if (!voiceChannel) {
    return message.channel.send({
      embed: {
        "title": "¡Necesitas estar en el mismo canal conmigo!",
        "color": 0xff2222
      }
    }).then(msg => {
      if (conf[message.guild.id].delete == 'true') {
        msg.delete(conf[message.guild.id].deleteTime);
      }
    });
  }
  voiceChannel.join();
  message.channel.send({
    embed: {
      "description": "**Me uní al canal: " + voiceChannel.name + "**",
      "color": 0x22ff22
    }
  }).then(msg => {
    if (conf[message.guild.id].delete == 'true') {
      msg.delete(conf[message.guild.id].deleteTime);
    }
  });

}

exports.config = {
  name: "join",
  aliases: ['entrar']
}