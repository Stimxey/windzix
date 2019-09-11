const Discord = require('discord.js');
var fs = require('fs-extra'); //FileSystem
let conf = JSON.parse(fs.readFileSync("./settings/guilds.json", "utf8")); //Config file

exports.run = (client, message, args) => {
  var resp = 
    "Miembros: " + message.guild.memberCount + "\n" +
    "En línea: " + message.guild.members.filter(e => e.presence.status === 'online').size + "\n" +
    "Ausentes: " + message.guild.members.filter(a => a.presence.status === 'idle').size + "\n" +
    "Ocupados: " + message.guild.members.filter(o => o.presence.status === 'dnd').size + "\n" +
    "Desconectados: " + message.guild.members.filter(d => d.presence.status === 'offline').size;

  let embed = new Discord.RichEmbed()
    .setColor(0xffffff)
    .setDescription(resp)
    .setTitle("Estadísticas")
    .setFooter(message + " | Dueño: " + message.guild.owner.user.tag);

  message.channel.send(embed);
}

exports.config = {
  name: "stats",
  aliases: []
}