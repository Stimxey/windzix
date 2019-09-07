const fs = require("fs");

module.exports.run = async (bot, message, args) => {
    const member = message.member; 
    let prefixes = require("../../settings/json/prefixes.json");
    if(!member.hasPermission('ADMINISTRATOR')) {
        return message.channel.send("You do not have permission for that command.");
    }
    if(args.length == 0) {
        return message.channel.send("You must provide a prefix.");
    }
    prefixes[message.guild.id].prefixes = args[0];
    fs.writeFile("./settings/json/prefixes.json", JSON.stringify(prefixes), function(err) { if(err) console.log(err) });
    message.channel.send("The prefix has been set to " + args[0]);
}

exports.config = {
  name: "setprefix",
  aliases: ['prefix', 'changeprefix'],
  description: "Comando para cambiar el prefix"
}