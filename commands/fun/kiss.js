const Discord = require("discord.js");
const snekfetch = require("snekfetch")

exports.run = async (client, message, args) => {
      if (message.mentions.users.size < 1) return message.channel.send("no puedes besar a nadie")
      let user = message.guild.member(message.mentions.users.first());
        snekfetch.get('https://nekos.life/api/kiss')
            .set('Key', 'dnZ4fFJbjtch56pNbfrZeSRfgWqdPDgf')
            .then(r => message.channel.send(`${user} Recibiste un beso de ${message.author.username} ❤`,{
                embed: {
                    image: {
                        url: r.body.url
                    }
                }
            })).catch(console.error);
}
   
exports.config = {
    name: "kiss",
    aliases: ['beso']
}