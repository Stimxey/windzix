var fs = require('fs-extra'); //FileSystem
let config = JSON.parse(fs.readFileSync("./settings/guilds.json", "utf8")); //Config file

exports.run = (client, message, args, ops) => { //Collecting info about command
  let fetched = ops.active.get(message.guild.id);
  
  if (!message.member.hasPermission("MOVE_MEMBERS")) return message.channel.send({
    embed: {
      "description": "Negado!",
      "color": 0xff2222,
      "title": "Error"
    }
  }).then(msg => {
    if (config[message.guild.id].delete == 'true') {
      msg.delete(config[message.guild.id].deleteTime);
    }
  });

  if (!fetched) return message.channel.send("¡No se está escuchando nada! Usa `play <url>|<canción>` para agregar una canción a la cola").then(msg => {
    if (config[message.guild.id].delete == 'true') {
      msg.delete(config[message.guild.id].deleteTime);
    }
  });
  if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send({
    embed: {
      "title": "¡Deberías estar en el mismo canal conmigo!",
      "color": 0xff2222
    }
  }).then(msg => {
    if (config[message.guild.id].delete == 'true') {
      msg.delete(config[message.guild.id].deleteTime);
    }
  });

  if (!fetched.dispatcher.paused) return message.channel.send({
    embed: {
      "title": "La canción no está en pausa",
      "color": 0xff2222
    }
  });

  fetched.dispatcher.resume();

  message.channel.send({
    embed: {
      "title": "Reanudado!",
      "color": 0x22ff22
    }
  }).then(msg => {
    if (config[message.guild.id].delete == 'true') {
      msg.delete(config[message.guild.id].deleteTime);
    }
  });

}

exports.config = {
  name: "resume",
  aliases: []
}