module.exports.run = (bot, message, args) => {
  
  message.channel.send(`Estoy en ${bot.guilds.array().length} servidores. Conozco ${bot.users.array().length} usuarios, y ${bot.channels.array().length} canales.`)

}

exports.config = {
  name: "listservers",
  aliases: ['servidores', 'srvs']
}