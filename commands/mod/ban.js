const Discord = require('discord.js');
var utils = require('bot-utils');
var fs = require('fs-extra'); //FileSystem
let conf = JSON.parse(fs.readFileSync("./settings/guilds.json", "utf8")); //Config file

exports.run = async (client, message, args, ops) => {

  let BReasons = [
    "Lo siento amigo, pero la mano perdida de alguien hoy",
    "Desde el corazón",
    "Simplemente porque",
    "Ban, jaja",
    "Tú lo pediste",
    "Solo ban"
  ];

  if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send({
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
  if (BMember.id == 598883701803188234) return message.reply("¿Estás hablando en serio?").then(msg => {
    if (conf[message.guild.id].delete == 'true') {
      msg.delete(conf[message.guild.id].deleteTime);
    }
  });
  if (!BMember.bannable) return message.reply("él es demasiado peligroso >_<").then(msg => {
    if (conf[message.guild.id].delete == 'true') {
      msg.delete(conf[message.guild.id].deleteTime);
    }
  });

  var embed = new Discord.RichEmbed()
    .setColor(0xFF2222)
    .setTitle("B A N")
    .setDescription(`🔨 ${BMember.user.tag} baneado por **${BReason}**`);

  BMember.ban(BReason).catch(error => message.reply(`Fuck\n${message.author.username},\n` + "```" + error + "```"));
  message.channel.send(embed);
  BMember.send(embed)

}

exports.config = {
  name: "ban",
  aliases: []
}