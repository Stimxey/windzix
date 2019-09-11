const fs = require("fs-extra");

module.exports.run = async (bot, message, args) => {
    const member = message.member; 
    let prefixes = require("../../settings/guilds.json");
    if(!member.hasPermission('ADMINISTRATOR')) {
        return message.channel.send("No tienes permiso para ese comando.");
    }
    if(args.length == 0) {
        return message.channel.send("Debes proporcionar un prefijo.");
    }
    prefixes[message.guild.id].prefixes = args[0];
    fs.writeFile("./settings/guilds.json", JSON.stringify(prefixes), function(err) { if(err) console.log(err) });
    message.channel.send("El prefijo se ha establecido en " + args[0]);
}

exports.config = {
  name: "setprefix",
  aliases: ['prefix', 'changeprefix'],
  description: "Comando para cambiar el prefix"
}