const Discord = require('discord.js');
const client = new Discord.Client();

module.exports.run = (bot, message, args) => {

  message.channel.send('Hola, para ver la lista de comando tienes que entrar a este link: https://windzix.ga/cmds/')

};

exports.config = {
  name: "help",
  aliases: ['h', 'ayuda'],
  description: "Muestra una lista de comandos"
};