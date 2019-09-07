const Discord = require('discord.js');

module.exports.run = (bot, message, args) => {
  let member = message.mentions.members.first();
  if (!member) return message.channel.send("You need to mention someone.")
  let role = message.mentions.roles.first();
  if (!role) return message.channel.send("You need to mention a role.")
  let roleid = role.id
  let rolename = role.name
  if (!message.guild.roles.get(roleid)) return message.channel.send(`That role doesn't exist...`);
  
  member.removeRole(roleid);
  let em = new Discord.RichEmbed()
  .setTitle("Hulkbot Delrole")
  .setDescription(`Okay! I removed the role ${rolename} from user ${member.user.username}.`)
  .setTimestamp()
  .setFooter(`${message.author.username} removed role ${rolename} from user ${member.user.username}.`)
  message.channel.send({embed: em})
}

exports.config = {
  name: "delrole",
  aliases: ['drol']
}