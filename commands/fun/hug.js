const Discord = require("discord.js");
const snekfetch = require("snekfetch")

exports.run = async (client, message, args) => {
      if (message.mentions.users.size < 1) return message.channel.send("no puedes abrazar a nadie")
      let user = message.guild.member(message.mentions.users.first());
        snekfetch.get('https://nekos.life/api/hug')
            .set('Key', 'dnZ4fFJbjtch56pNbfrZeSRfgWqdPDgf')
            .then(r => message.channel.send(`${user} Recibiste una abrazo de ${message.author.username} ❤`,{
                embed: {
                    image: {
                        url: r.body.url
                    }
                }
            }))
}
   
exports.config = {
    name: "hug",
    aliases: ['abrazo']
}