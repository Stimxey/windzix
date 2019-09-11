const Discord = require('discord.js');
var fs = require('fs-extra'); //FileSystem
let conf = JSON.parse(fs.readFileSync("./settings/guilds.json", "utf8")); //Config file

exports.run = (client, message, args) => {

  var resp = 
    "**Total de usuarios: **" + client.users.size + "\n" +
    "**Total de servidores: **" + client.guilds.size + "\n" +
    "**Total de canales: **" + client.channels.size + "\n"
  
  var embed = new Discord.RichEmbed()
    .setColor(0xffffff)
    .setDescription(resp)
    .setTitle("Acerca de | Haga clic para unirse al servidor de soporte")
    .setURL("https://discord.gg/")
  
  message.channel.send(embed);
  
};

exports.config = {
  name: "about",
  aliases: ['acercade']
}