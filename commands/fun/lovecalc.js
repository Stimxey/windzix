const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
let users = message.mentions.users.map(m => m.username).join(' y ');
if(!users) return message.channel.send('Mencione a dos usuarios para calcular');
    
const random = Math.floor(Math.random() * 100);
let heard = "";
 
    if(random < 50){
        heard=':broken_heart:';

    }else if(random < 80){
        heard=':sparkling_heart: ';
        
    }else if(random < 101){
        heard=':heart:';

    }
            
const embed = new Discord.RichEmbed()
    .setAuthor('El porcentaje de amor con '+users+' es:')
    .setDescription(heard+' **'+random+' %**'+' '+heard)
    .setColor(0xff4d4d)

message.channel.send({embed});
}

exports.config = {
  name: "lovecalc",
  aliases: ['lc', 'calclove'],
  description: "Comando para calcular el amor entre 2 personas"
};