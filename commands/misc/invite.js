const Discord = require('discord.js');

module.exports.run = (bot, message, args) => {
  let embed = new Discord.RichEmbed()
  .setTitle("Windzix Invitación")
  .setDescription(`No puedo usar enlaces de invitación.\n¡Aquí hay un enlace OAuth2 en su lugar! Haga [clic aquí](https://discordapp.com/api/oauth2/authorize?client_id=294194506113220608&permissions=8&redirect_uri=https%3A%2F%2Fbot.hulkbot.ml%2Fhome&response_type=code&scope=bot%20guilds)  para invitarme!`)
  .setColor("GREEN")
  .setFooter(`Comando para invitarme`)
  .setTimestamp()
  message.channel.send({embed: embed})
}

exports.config = {
  name: "invite",
  aliases: []
}