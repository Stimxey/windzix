var fs = require('fs-extra'); //FileSystem
let config = JSON.parse(fs.readFileSync("./settings/guilds.json", "utf8")); //Config file
const Discord = require('discord.js');
const urban = require('urban');

exports.run = (client, message, args, ops) => {
  urban(args).first(json => {

    if (!json) return message.channel.send({
      embed: {
        "description": "Nada Encontrado :sweat: ",
        "color": 0xFF2222
      }
    });

    let embed = new Discord.RichEmbed()
      .setColor(0x56aaff)
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
  name: "urban",
  aliases: ['urb']
}