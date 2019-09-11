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
  if (tomute.hasPermission("MANAGE_MESSAGES")) return message.channel.send({
    embed: {
      "title": "El usuario que está tratando de silenciar es el mismo o mayor rol que usted.",
      "color": 0xff2222
    }
  }).then(msg => {
    if (conf[message.guild.id].delete == 'true') {
      msg.delete(conf[message.guild.id].deleteTime);
    }
  });
  let muterole = message.guild.roles.find(r => r.name === "Shhh");

  if (!muterole) {
    try {
      muterole = await message.guild.createRole({
        name: "Shhh",
        color: "#fff",
        permissions: []
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    } catch (e) {
      console.log(e.stack);
    }
  }

  let mutetime = args[1];
  if (!mutetime) return message.channel.send({
    embed: {
      "title": "¡No especificaste una hora!",
      "color": 0xff2222
    }
  }).then(msg => {
    if (conf[message.guild.id].delete == 'true') {
      msg.delete(conf[message.guild.id].deleteTime);
    }
  });

  await (tomute.addRole(muterole.id));
  message.channel.send({
    embed: {
      "title": "Muteado",
      "description": `<@${tomute.id}> ha sido muteado por ${ms(ms(mutetime))} segundos por <@${message.author.id}>`,
      "color": 0xf47742
    }
  }).then(msg => {
    if (conf[message.guild.id].delete == 'true') {
      msg.delete(conf[message.guild.id].deleteTime);
    }
  });

  setTimeout(function() {
    
    if (!tomute.roles.has(muterole.id)) return;
    
    tomute.removeRole(muterole.id);

    message.channel.send({
      embed: {
        "description": `<@${tomute.id}> ha sido desmuteado!`,
        "color": 0x22ff22,
        "title": "Desmuteado"
      }
    }).then(msg => {
      if (conf[message.guild.id].delete == 'true') {
        msg.delete(conf[message.guild.id].deleteTime);
      }
    });
  }, ms(mutetime));

}

exports.config = {
  name: "mute",
  aliases: []
}