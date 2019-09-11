const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  
  const member = message.member; 
    if(!member.hasPermission('MANAGE_MESSAGES')) {
        return message.channel.send("No tienes permiso para ese comando.");
    }
  
    const sayMessage = args.join(" ");
      let sembed = new Discord.RichEmbed()
        .setDescription(sayMessage)
        .setColor("#36393f");
      message.delete().catch();
    message.channel.send(sembed);

}

exports.config = {
  name: "embed", 
  aliases: [],
  description: "Comando para decir algo."
  };
