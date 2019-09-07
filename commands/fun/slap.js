const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let slap = [
      "https://gifsanimados.de/img-gifsanimados.de/a/anime/cojin-en-la-cara.gif",
      "https://cdn.weeb.sh/images/r1siXJKw-.gif",
      "https://cdn.weeb.sh/images/SJx7M0Ft-.gif",
      "https://cdn.weeb.sh/images/HkK2mkYPZ.gif",
      "https://cdn.weeb.sh/images/H1n57yYP-.gif",
      
    ]
    let hugresult = Math.floor((Math.random() * slap.length));
    if (!args[0]) {
        const ghembed = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setTitle(`No puedes bofetearte tu mismo..`)
        message.channel.send({
            embed: ghembed
        })
        return;
    }
    if (!message.mentions.members.first().user.username === message.isMentioned(message.author)) {
        const hembed = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setTitle(`${message.author.username} le dio una bofetada a ${message.mentions.members.first().user.username} ¡Que grosero!`)
            .setImage(slap[hugresult])
        message.channel.send({
            embed: hembed
        })
        return;
    }
    const ghembed = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setTitle(`No puedes bofetearte tu mismo..`)
        message.channel.send({
            embed: ghembed
        })
}  

exports.config = {
  name: "slap",
  aliases: [],
  description: "Comando para dar una bofetada"
};