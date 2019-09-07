module.exports.run = (bot, message, args) => {
  
let msg = args.join(" ");
if (message.author.id == message.guild.ownerID) {
   message.channel.send("Alerting admins...")
  message.guild.members.forEach(member => {
    if (member.hasPermission("ADMINISTRATOR") || member.hasPermission("MANAGE_GUILD") && !member.user.bot) {
      if (!msg) {
        member.channel.send(`${message.author.username} is calling for you in server ${message.guild.name}.`)
        message.channel.send(`Alerted ${member.user.username}.`)
      } else {
        member.channel.send(`${message.author.username} is calling for you in server ${message.guild.name}. Message: ${msg}`)
        message.channel.send(`Alerted ${member.user.username}.`)
      }
    }
  })
  } else {
    message.channel.send("Only the guild owner can use this command.");
  }
}

exports.config = {
  name: "alert",
  aliases: ['alerta']
}