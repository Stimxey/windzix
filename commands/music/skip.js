var fs = require('fs-extra'); //FileSystem
let conf = JSON.parse(fs.readFileSync("./settings/guilds.json", "utf8")); //Config file

exports.run = (client, message, args, ops) => { //Collecting info about command

  let fetched = ops.active.get(message.guild.id);

  if (!fetched) return message.channel.send("¡No se está escuchando nada! Usa `play <url>|<canción>` para agregar una canción a la cola");
  if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send("¡Debes estar en el mismo canal con el bot!");

  var userCount = message.member.voiceChannel.members.size;
  var required = Math.ceil(userCount / 2);

  if (!fetched.queue[0].voteSkips) {
    fetched.queue[0].voteSkips = [];
  }

  if (fetched.queue[0].voteSkips.includes(message.member.id)) {
    return message.channel.send({
      embed: {
        "title": "¡Ya has votado por saltar!",
        "description": "Izquierda: " + fetched.queue[0].voteSkips.length / required,
        "color": 0xff2222
      }
    });
  }

  fetched.queue[0].voteSkips.push(message.member.id);
  ops.active.set(message.guild.id, fetched);

  if (fetched.queue[0].voteSkips.length >= required) {
    message.channel.send({
      embed: {
        "title": "¡Canción saltada!",
        "color": 0x22ff22
      }
    }).then(msg => {
      if (conf[message.guild.id].delete == 'true') {
        msg.delete(conf[message.guild.id].deleteTime);
      }
    });
    if (!fetched.queue.length == 0) {
      return fetched.dispatcher.emit('finish');
    } else {
      return fetched.dispatcher.end();
    }
    ops.active.set(message.guild.id, fetched);
  }

  message.channel.send({
    embed: {
      "title": "Votado!",
      "description": "Izquierda: " + Math.ceil(fetched.queue[0].voteSkips.length / required),
      "color": 0x22ff22
    }
  }).then(msg => {
    if (conf[message.guild.id].delete == 'true') {
      msg.delete(conf[message.guild.id].deleteTime);
    }
  });

}

exports.config = {
  name: "skip",
  aliases: ['s']
}