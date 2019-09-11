const Discord = require("discord.js");
var fs = require('fs-extra'); //FileSystem
let config = JSON.parse(fs.readFileSync("./settings/guilds.json", "utf8")); //Config file
const urban = require("urban");

exports.run = (client, message, args, ops) => { //Collecting info about command

  urban.random().first(json => {

    if (!json) return message.channel.send({
      embed: {
        "description": "Nada funciona :sweat: ",
        "color": 0xFF2222
      }
    });

    let embed = new Discord.RichEmbed()
      .setColor(0x42f4cb)
      .setDescription(json.definition)
      .addField('Ejemplo', json.example)
      .addField(`Votos a favor`, json.thumbs_up, true)
      .addField(`Votos en contra`, json.thumbs_down, true)
      .setFooter(`Escrito por ${json.author}`)
      .setTitle(json.word);

    message.channel.send(embed);

  });

}

exports.config = {
  name: "randomurban",
  aliases: ['rurb']
}