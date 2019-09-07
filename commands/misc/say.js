const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  
  const member = message.member; 
    if(!member.hasPermission('MANAGE_MESSAGES')) {
        return message.channel.send("You do not have permission for that command.");
    }
  
    const sayMessage = args.join(" ");
      let sembed = new Discord.RichEmbed()
        .setDescription(sayMessage)
        .setColor("#36393f");
      message.delete().catch();
    message.channel.send(sembed);

}

exports.config = {
  name: "say", 
  aliases: [],
  description: "Comando para decir algo."
  };
