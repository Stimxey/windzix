var fs = require('fs-extra'); //FileSystem
let config = JSON.parse(fs.readFileSync("./settings/guilds.json", "utf8")); //Config file

exports.run = (client, message, args, ops) => { //Collecting info about command

  let fetched = ops.active.get(message.guild.id);

  if (!fetched) {
    return message.channel.send({ embed: {"description": "Queue empty!"} });
  }

  let queue = fetched.queue;
  let nowPlaying = queue[0];

  let response = "Ahora escuchando: **" + nowPlaying.songTitle + "**\nSugerida por " + nowPlaying.requestAuthor.username;
  let queueList = "";
  if (queue.length == 1) {
    queueList = "";
  } else {
    queueList = "\n\n**Queue:** \n";
  }

  for (let i = 1; i < queue.length; i++) {
    queueList += i + ". **" + queue[i].songTitle + "** - *" + queue[i].requestAuthor.username + "*\n";
  }

  message.channel.send({
    embed: {
      "description": response + queueList,
      "footer": {
        "text": message + ""
      },
      "color": 10288426
    }
  }).then(msg => {
    if (config[message.guild.id].delete == 'true') {
      msg.delete(config[message.guild.id].deleteTime);
    }
  });

}

exports.config = {
  name: "queue",
  aliases: []
}