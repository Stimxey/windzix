const Discord = require('discord.js');
const randomPuppy = require('random-puppy')

module.exports.run = async(bot, message, args) => {
  if(message.author.bot) return;
  if(message.channel.type !== "text") return;
  randomPuppy('dog')
            .then(url => {
                const embed = new Discord.RichEmbed()
                
                .setAuthor(`${message.author.tag} | ¡Tu perro!`, message.author.displayAvatarURL)
                .setImage(url)
                .setColor(`${message.guild.me.displayHexColor!=='#000000' ? message.guild.me.displayHexColor : 0xffffff}`)
    return message.channel.send({ embed });
            })
}

exports.config = {
  name: "dog",
  aliases: ['perros'],
  description: "Comando para ver perros"
};