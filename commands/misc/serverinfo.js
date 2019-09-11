const Discord = require("discord.js");

exports.run = (client, message, args) => {
   const role = message.guild.roles.size;
   const online = message.guild.members.filter(m => m.presence.status != 'online').size
   const verificationLevels = ['Ninguna', 'Baja', 'Media', 'Insana', 'Extrema'];
      const embed = new Discord.RichEmbed()
     .setAuthor(message.guild.name, message.guild.iconURL)
     .setColor(0x00A2E8)
      .setDescription(`Dueño: ${message.guild.owner.user.tag} (${message.guild.owner.id})`)
      .addField('Total de miembros: ', `${message.guild.memberCount}`, true)
      .addField('En linea: ', `${online}`, true)
      .addField('Región: ', message.guild.region)
      .addField('Creado en: ', message.guild.createdAt.toLocaleString(), true)
      .addField("Nivel de Verificación: ", `${verificationLevels[message.guild.verificationLevel]}`)
      .addField('Canales de voz: ' , `${message.guild.channels.filter(chan => chan.type === 'voice').size}`)
      .addField('Canales de texto: ' , `${message.guild.channels.filter(chan => chan.type === 'text').size}`, true)
      .addField('Roles: ', role, true)
      message.channel.send({embed}) 
}
   
exports.config = {
  name: "serverinfo",
  aliases: ["svinfo", "svi"]
}