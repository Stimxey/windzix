const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  
  const member = message.member; 
    if(!member.hasPermission('MANAGE_MESSAGES')) {
        return message.channel.send("No tienes permiso para ese comando.");
    }
  
    const sayMessage = args.join(" ");
      message.channel.send(sayMessage);

}

exports.config = {
  name: "say", 
  aliases: [],
  description: "Comando para decir algo."
  };
