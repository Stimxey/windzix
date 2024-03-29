var fs = require('fs-extra'); //FileSystem
let config = JSON.parse(fs.readFileSync("./settings/guilds.json", "utf8")); //Config file
const db = require("quick.db");
const Discord = require('discord.js');

exports.run = async (client, message, args) => {

  let reasons = [
    "Lo siento amigo, pero la mano perdida de alguien hoy",
    "Desde el corazón",
    "Simplemente porque",
    "No hay razón, jaja",
    "Tú lo pediste"
  ];

  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send({
    embed: {
      "title": "Lo sentimos, pero no tienes permiso para usar esto.",
      "color": 0xff2222
    }
  });
  let warnedmember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if (!warnedmember) return message.channel.send({
    embed: {
      "title": "Mencione un usuario para advertir.",
      "color": 0xff2222
    }
  });
  let reason = args.slice(1).join(' ');
  if (!reason) reason = reasons[Math.floor(Math.random() * reasons.length)];

  const warned = new Discord.RichEmbed()
    .setColor(0xff5821)
    .setDescription(`You have been warned in ${message.guild.name} by ${message.author.username} for: *${reason}*.`)
    .setTitle("Warn")

  let author = message.author.username;

  const numberwarn = new db.table('WARNNUMBERs')
  const num1 = await numberwarn.fetch(`user_${warnedmember.id}_${message.guild.id}`)
  const y = 1
  var m = y + num1
  numberwarn.set(`user_${warnedmember.id}_${message.guild.id}`, m)

  const userwarn = new db.table('USERWARNINGs')
  var num2 = await numberwarn.fetch(`user_${warnedmember.id}_${message.guild.id}`)
  const warns = await userwarn.fetch(`warn_${warnedmember.id}_${num2}_${message.guild.id}_${author}`)
  userwarn.set(`warn_${warnedmember.id}_${num2}_${message.guild.name}_${author}`, reason)

  message.channel.send({
    embed: {
      "description": `***${warnedmember.user.tag} was warned!***\n**Reason: **${reason}`,
      "title": "Advertido por " + message.author.username,
      "color": 0xff5821
    }
  });
  await warnedmember.send(warned);

}

exports.config = {
  name: "warn",
  aliases: []
}