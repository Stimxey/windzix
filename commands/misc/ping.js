const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
        let pEmbed = new Discord.RichEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setTitle('Pong!')
        .addField(':incoming_envelope: Ping Mensajes:', (new Date().getTime() - message.createdTimestamp) + ' ms', true)
        .addField(':satellite_orbital: Ping DiscordAPI:' , `${Math.round(bot.ping)} ms`, false);
         message.channel.send(pEmbed);
}


exports.config = {
  name: "ping",
  aliases: ['pong'],
  description: "Comando para ver tu ping"
};
