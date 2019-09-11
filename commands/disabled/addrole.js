const Discord = require('discord.js');

module.exports.run = (client, message, args) => {
   if(!member.hasPermission('MANAGE_ROLES')) {
        return message.channel.send("No tienes permiso para ese comando.");
    }
  let role = message.mentions.roles.first();
  if (!role) return message.channel.send(`You need to mention a role.`);
  let member = message.mentions.members.first();
  if (!member) return message.channel.send("Necesitas mencionar a alguien.");
  let roleid = role.id;
  let rolename = role.name;
  
  if (!message.guild.roles.get(roleid)) return message.channel.send(`That role doesn't exist...`);
  member.addRole(role.id);
  let em = new Discord.RichEmbed()
  .setTitle("Windzix Addrole")
  .setDescription(`Okay! I added the role ${rolename} to the user ${member.user.username}.`)
  .setTimestamp()
  .setFooter(`${message.author.username} added role ${rolename} to user ${member.user.username}.`)
  message.channel.send({embed: em})
  if (member.displayName) {
    em.setDescription(`Okay! I added the role ${rolename} to the user ${member.displayName}.`)
    em.setFooter(`${message.author.username} added role ${rolename} to user ${member.displayName}.`)
  }
};

exports.config = {
  name: "addrole",
  aliases: ['arol'],
  description: "Comando para agregar un rol a un usuario"
  
};