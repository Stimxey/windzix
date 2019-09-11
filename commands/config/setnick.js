const Discord = require("discord.js");

exports.run = (client, message, args) => {
      if (!message.member.hasPermission("MANAGE_NICKNAMES"))  {
    return message.reply("No tienes permisos para cambiarle el nombre al bot.");
    } else {
      let username = args.join(' ');
      if (username.length < 1) return message.reply('Debe proporcionar un nombre para el cliente.')
       message.guild.members.get('617400949731753987').setNickname(username);
        const embed = new Discord.RichEmbed()
        .setColor(0x00A2E8)
        .addField("Nombre de usuario de bot configurado correctamente", "Ahora **" + username + "** es el apodo del bot :white_check_mark:");
        message.reply({embed})
  }
}

exports.config = {
  name: "setnick",
  aliases: ['nick']
}