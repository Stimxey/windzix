const Discord = require('discord.js');
var utils = require('bot-utils');
var fs = require('fs-extra'); //FileSystem
let conf = JSON.parse(fs.readFileSync("./settings/guilds.json", "utf8")); //Config file

exports.run = async (client, message, args, ops) => {

  let BReasons = [
    "Lo siento amigo, pero la mano perdida de alguien hoy",
    "Desde el corazón",
    "Simplemente porque",
    "Expulsado, jaja",
    "Tú lo pediste"
  ];

  if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send({
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

  let BMember = message.mentions.members.first();
  let BReason = args.slice(1).join(" ");
  if (!BReason) {
    BReason = BReasons[Math.floor(Math.random() * BReasons.length)];
  }
  if (!BMember) return message.reply("por favor, mencione a un usuario").then(msg => {
    if (conf[message.guild.id].delete == 'true') {
      msg.delete(conf[message.guild.id].deleteTime);
    }
  });
  if (BMember.id == 464747957288435732) return message.reply("¿Estás hablando en serio?").then(msg => {
    if (conf[message.guild.id].delete == 'true') {
      msg.delete(conf[message.guild.id].deleteTime);
    }
  });
  if (!BMember.kickable) return message.reply("el es demasiado peligroso >_<").then(msg => {
    if (conf[message.guild.id].delete == 'true') {
      msg.delete(conf[message.guild.id].deleteTime);
    }
  });

  var embed = new Discord.RichEmbed()
    .setColor(0xFF2222)
    .setTitle("KICK")
    .setDescription(`🔨 ${BMember.user.tag} expulsado por \n**${BReason}**`);
  BMember.kick(BReason).catch(error => message.reply(`¡Qué día es hoy! No pude expulsar a ${message.author}, ¿Por qué?, pero tal vez por: \n` + "```" + error + "```"));
  message.channel.send(embed);
  BMember.send(embed);
}

exports.config = {
  name: "kick",
  aliases: []
}