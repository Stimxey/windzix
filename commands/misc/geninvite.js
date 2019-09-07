const Discord = require('discord.js');

module.exports.run = (bot, message, args) => {
  
if (message.author.id == process.env.OID) {
  let guildid = args.join(' ');
  bot.guilds.get(guildid).channels.first().createInvite().then(inv => bot.users.get(process.env.OID).send(`https://discord.gg/${inv.code}`))
  } else {
    message.channel.send("Nope!")
  }
  
};

exports.config = {
  name: "geninvite",
  aliases: ['ginvite', 'igen']
};