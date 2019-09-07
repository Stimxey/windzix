const Discord = require('discord.js')
module.exports.run = async (Client, message, args) => {

  const embed = new Discord.RichEmbed()
    .setTitle(`Total de miembros en ${message.guild.name}`)
    .setColor(0x00FFFF)
    .setFooter(`Pedido por ${message.author.tag}`, message.author.avatarURL)
    .addField('Total', message.guild.memberCount, true)
    .addField('Humanos', message.guild.members.filter(m => !m.user.bot).size, true)
    .addField('Bots', message.guild.members.filter(m => m.user.bot).size, true);

  return message.channel.send(embed);
};

exports.config = {
  name: "membercount",
  aliases: ['mc']
}