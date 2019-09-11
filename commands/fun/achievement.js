const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    try {
       const text = args.join(" ");
        if (text === null) return message.channel.send("Debes proporcionar texto para el logro");
            if (text.length > 25) return message.reply('El texto debe tener menos de 25 caracteres.');
        const superagent = require('superagent')
        const { body } = await superagent
            .get('https://www.minecraftskinstealer.com/achievement/a.php')
            .query({
                i: 8,
                h: '¡Logro obtenido!',
                t: text
            });
        message.channel.send({ files: [{ attachment: body, name: 'achievement.png' }] 
      });
    } catch (err) {
            message.channel.send('Usa `w!logro [logro]`')
    }
}

exports.config = {
  name: "achievement",
  aliases: ['logro']
}