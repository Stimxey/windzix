const Discord = require('discord.js');

module.exports.run = (bot, message, args) => {
     if(!member.hasPermission('MANAGE_ROLES')) {
        return message.channel.send("No tienes permiso para ese comando.");
    }
  let member = message.mentions.members.first();
  if (!member) return message.channel.send("Necesitas mencionar a alguien.")
  let role = message.mentions.roles.first();
  if (!role) return message.channel.send("Necesitas mencionar un rol.")
  let roleid = role.id
  let rolename = role.name
  if (!message.guild.roles.get(roleid)) return message.channel.send(`Ese papel no existe...`);
  
  member.removeRole(roleid);
  let em = new Discord.RichEmbed()
  .setTitle("Windzinx delrole")
  .setDescription(`¡Bueno! Eliminé el rol ${rolename} del usuario ${member.user.username}.`)
  .setTimestamp()
  .setFooter(`${message.author.username} rol emocionado${rolename} del usuario ${member.user.username}.`)
  message.channel.send({embed: em})
}

exports.config = {
  name: "delrole",
  aliases: ['drol']
}