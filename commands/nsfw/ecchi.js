const Discord = require('discord.js');
const randomPuppy = require('random-puppy')

module.exports.run = async(bot, message, args) => {
  if(!message.channel.nsfw) return message.channel.send(`:underage: **Este canal no está marcado como NSFW!** :angry: `)
  randomPuppy('ecchi')
            .then(url => {
                const embed = new Discord.RichEmbed()
                
                .setTitle(`Ecchi NSFW`)
                .setFooter(`Solicitado por ${message.author.tag}`)
                .setImage(url)
                .setColor(`${message.guild.me.displayHexColor!=='#000000' ? message.guild.me.displayHexColor : 0xffffff}`)
    return message.channel.send({ embed });
            })
}

exports.config = {
  name: "ecchi",
  aliases: [],
  description: "Comando para ver ecchi"
};