var fs = require('fs-extra'); //FileSystem
let conf = JSON.parse(fs.readFileSync("./settings/guilds.json", "utf8")); //Config file

exports.run = (client, message, args) => {

  let reasons = [
    "Hola",
    "Desde el corazón",
    "Simplemente porque",
    "Jajaja unban",
    "Solo se libre"
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

  const reason = args.slice(1).join(' ');
  if (!reason) {
    reason = reasons[Math.floor(Math.random() * reasons.length)];
  }
  client.unbanReason = reason;
  const user = args[0] || message.mentions.members.first();

  if (!user) return message.reply({ embed: {"title": 'Mencione un usuario!', "color": 0xff2222} }).then(msg => {
    if (conf[message.guild.id].delete == 'true') {
      msg.delete(conf[message.guild.id].deleteTime);
    }
  });

  message.guild.unban(user);
  message.channel.send({
    embed: {
      "title": `Desbando con éxito<@${user}>`,
      "description": "Razón: " + reason,
      "color": 0x22ff22
    }
  });
};

exports.config = {
  name: "unban",
  aliases: []
}