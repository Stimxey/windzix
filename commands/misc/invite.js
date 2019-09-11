const Discord = require('discord.js');

module.exports.run = (bot, message, args) => {
  let embed = new Discord.RichEmbed()
  .setTitle("Windzix Invitación")
  .setDescription(`¡Aquí hay un enlace OAuth2! Haga [clic aquí](https://discordapp.com/oauth2/authorize?client_id=617400949731753987&permissions=402648566&scope=bot)  para invitarme!`)
  .setColor("GREEN")
  .setFooter(`Comando para invitarme`)
  .setTimestamp()
  message.channel.send({embed: embed})
}

exports.config = {
  name: "invite",
  aliases: ['invitar']
}