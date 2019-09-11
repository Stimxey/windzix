const Discord = require("discord.js");
var fs = require('fs-extra'); //FileSystem
let conf = JSON.parse(fs.readFileSync("./settings/guilds.json", "utf8")); //Config file

exports.run = (client, message, args) => {

  if (args.length == 0) {
    return message.channel.send({
      embed: {
        "title": "Ayuda",
        "fields": [{
            "name": "Simple Poll (Si/No)",
            "value": "`poll` - este menú\n`poll <tiempo> <pregunta>` - encuesta con final de tiempo. El tiempo debe ingresarse en segundos, predeterminado: 1 hora"
          },
          {
            "name": "Multi-choice Poll",
            "value": "`mpoll <tiempo> <pregunta> <respuesta 1>...<repuesta 9>` - encuesta con opción múltiple y final temporizado. El tiempo debe ingresarse en segundos, predeterminado: 1 hora"
          }
        ],
        "color": 3264944,
        "footer": {
          "text": message + ""
        }
      }
    });
  }

  let time1 = args.shift();
  let question = args.join(" ");

  if (!isNaN(time1)) {
    time1 = time1 * 1000;
  } else {
    question = time1 + " " + question;
    time1 = 3600 * 1000;
  }

  message.channel.send({
    embed: {
      "title": "Encuesta:",
      "description": question + "",
      "color": "3264944",
      "footer": {
        "text": "Encuesta creada " + message.author.username,
        "icon_url": message.author.avatarURL
      }
    }
  }).then(async function(msg) {
    await msg.react('👍');
    await msg.react('👎');

    var reactions = await msg.awaitReactions(reaction => reaction.emoji.name === '👍' || reaction.emoji.name === '👎', {
      time: time1
    });

    var yes = "Más votados 👍";
    var no = "Más votados 👎";
    var tie = "Empate!";
    var end;

    if (msg.reactions.get('👍').count - 1 > msg.reactions.get('👎').count - 1) {
      end = yes
    } else if (msg.reactions.get('👍').count - 1 < msg.reactions.get('👎').count - 1) {
      end = no
    } else if (msg.reactions.get('👍').count - 1 == msg.reactions.get('👎').count - 1) {
      end = tie
    }

    msg.channel.send({
      embed: {
        "title": question,
        "description": `**¡La encuesta terminó!** \n\n👍: ${msg.reactions.get('👍').count-1}\n***----------***\n👎: ${msg.reactions.get('👎').count-1}`,
        "color": 3264944,
        "footer": {
          "text": end
        }
      }
    })
  });

}

exports.config = {
  name: "poll",
  aliases: []
}