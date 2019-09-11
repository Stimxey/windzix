const discord = require('discord.js');
const config = require(`../../settings/config.json`);


function sendAnnounce(bot, message, args, guild) {
  var sendChannel = "";
  if (config.donotAnnounce.includes(guild.id)) return message.channel.send(`ðŸ—³ Faild to send announcement to ${guild.name} (In DNA list)`).then(m => m.delete(20000));
  
  if (guild.channels.find("name", "general")) {
    sendChannel = guild.channels.find("name", "general");
  } else if (guild.channels.find("name", "chat")) {
    sendChannel = guild.channels.find("name", "chat");
  } else if (guild.channels.find("name", "lounge")) {
    sendChannel = guild.channels.find("name", "lounge");
  } else if (guild.channels.find("name", "announcements")) {
    sendChannel = guild.channels.find("name", "announcements");
  }

  let announce = new discord.RichEmbed()
    .setColor("7289DA")
    .setAuthor(`${bot.user.username} Announcement`)
    .setDescription(`**Hola! Aquí Codezix, creador de Windzix solo queriendo que sepas, **\n${args.join(' ')}\n\n**Este mensaje fue enviado a *${guild.name}* a propósito del creador.**\n*Este sistema de anuncios tampoco será estafado mucho.*`)
    .setFooter(`Un anuncio oficial de Codezix.`, bot.user.avatarURL)
    .setTimestamp();

  if (sendChannel !== "") {
    sendChannel.send({ embed: announce })
      .then(() => {
        message.channel.send(`Sent announcement to ${guild.name}`).then(m => m.delete(20000));
      })
      .catch(err => {
        message.channel.send(`Failed to send announcement to ${guild.name} (Send Error)`).then(m => m.delete(20000));
      });
  } else {
    message.channel.send(`Failed to send announcement to ${guild.name} (No channel)`).then(m => m.delete(20000));
  }
}
module.exports.run = (bot, message, args) => {
  if(message.author.id !== process.env.OID) return message.channel.send("Solo el dueño del bot puede utilizar este comando.")
  //return; // SOON
  let announceTest = new discord.RichEmbed()
    .setColor("7289DA")
    .setAuthor(`Anuncio importante`, bot.user.avatarURL)
    .setDescription(`**Hola, acabo de enviar un anuncio...**\n${args.join(' ')}\n\n**Este mensaje fue enviado a *${message.guild.name}* a propósito del creador.**\n*Este sistema de anuncios tampoco será estafado mucho.*`)
    .setFooter(`Ejemplo de prueba ¡responda sí para enviar a cada servidor!`)
    .setTimestamp();

  message.channel.send({ embed: announceTest })
    .then((m) => {
      message.channel.awaitMessages(response => response.content.toLowerCase() === 'yes', {
          max: 1,
          time: 10000,
          errors: ['time'],
        }).then((collected) => {
          m.delete();
          collected.first().delete();
          message.channel.send(`Now sending an announcement to every guild im in! [${bot.guilds.array().length} guilds]`).then(m => m.delete(10000));
          bot.guilds.forEach((guild, id) => {
            sendAnnounce(bot, message, args, guild);
          });
        })
        .catch(() => {
          message.channel.send(`Announcement canceled`).then(m => m.delete(5000));
          m.delete();
        });
    });
};

exports.config = {
  name: "ganuncio",
  aliases: ['ga']
}