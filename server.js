/* ########################################################## */

const http = require('http');
const express = require('express');
const app = express();

app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/", (request, response) => {
  response.sendStatus(200);
});

app.get('*', function(request, response) {
  response.status(404).sendFile(__dirname + '/404/index.html');
});

app.listen(process.env.PORT);

setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`); 
}, 280000);

/* ########################################################## */

const Discord = require('discord.js'); // Require discord.js
const bot = new Discord.Client(); // Discord.js Client (Bot)
const modules = ['misc', 'owner', 'nsfw', 'fun', 'util', 'config', 'music', 'games', 'mod']; // This will be the list of the names of all modules (folder) your bot owns
const fs = require('fs-extra'); // Require fs to go throw all folder and files
try {
    var config = JSON.parse(fs.readFileSync("./settings/guilds.json", "utf8")); //Overwrite prefix (important for changing prefix)
  } catch(ex){
    console.log("[ERROR] Configuración sobrescrita");
    var config = {}
    fs.writeFile("./settings/guilds.json", JSON.stringify(config), (err) => console.error);
  }
const active = new Map();

bot.on('guildCreate', (guild) => { // If the Bot was added on a server, proceed
  const chan = bot.channels.get("620782650126237736");
  
  config[guild.id] = {
      prefix: '#',
      delete: 'true',
      deleteTime: 10000,
      volume: 100,
      maxVolume: 200,
      djonly: false,
      djroles: []
  }
  fs.writeFile("./settings/guilds.json", JSON.stringify(config), (err) => console.error);

  let liveLEmbed = new Discord.RichEmbed()
    .setAuthor(bot.user.username, bot.user.avatarURL)
    .setTitle(`Joined A Guild`)
    .setDescription(`**Guild Name**: ${guild.name}\n**Guild ID**: ${guild.id}\n**Members Get**: ${guild.memberCount}`)
  chan.send(liveLEmbed);
  
}); 

bot.on('guildDelete', (guild) => { // If the Bot was removed on a server, proceed
    delete config[guild.id]; // Deletes the Guild ID and Prefix
    fs.writeFile('./settings/guilds.json', JSON.stringify(config, null, 2), (err) => {
        if (err) console.log(err)
    })
    const chan = bot.channels.get("620782650126237736");
    let liveLEmbed = new Discord.RichEmbed()
        .setAuthor(bot.user.username, bot.user.avatarURL)
        .setTitle(`Stopped Serving A Guild`)
        .setDescription(`**Guild Name**: ${guild.name}\n**Guild ID**: ${guild.id}\n**Members Lost**: ${guild.memberCount}`)
    chan.send(liveLEmbed);
});


/* ON MESSAGE */
bot.on('message', message => { //If recieves message
  
  if(message.author.bot || message.channel.type === "dm") return;
  
  try {
    config = JSON.parse(fs.readFileSync("./settings/guilds.json", "utf8")); //Overwrite prefix (important for changing prefix)
  } catch(ex){
    config[message.guild.id] = {
      prefix: '#',
      delete: 'true',
      deleteTime: 10000,
      volume: 100,
      maxVolume: 200,
      djonly: false,
      djroles: []
    }
    fs.writeFile("./settings/guilds.json", JSON.stringify(config), (err) => console.error);
  }
  
  
  if (config[message.guild.id] == undefined) {
    config[message.guild.id] = {
      prefix: '#',
      delete: 'true',
      deleteTime: 10000,
      volume: 100,
      maxVolume: 200,
      djonly: false,
      djroles: []
    }
    fs.writeFile("./settings/guilds.json", JSON.stringify(config), (err) => console.error);
  }
  
  if (message.author.bot) return; //If bot

  var prefix = config[message.guild.id].prefix;

  let args = message.content.slice(prefix.length).trim().split(' '); //Setting-up arguments of command
  let cmd = args.shift().toLowerCase(); //LowerCase command
  
  if (message.content === "#!reset-prefix") {
    config[message.guild.id].prefix = '#';
    fs.writeFile("./settings/guilds.json", JSON.stringify(config), (err) => console.error);
    message.channel.send({ embed: {"title": "Prefix - #", "color": 0x22ff22} });
    return;
  }

  if (!message.content.startsWith(prefix)) return; //If no prefix

  //Command handler
  try {

    if (cmd == '') {
      message.channel.send({
        embed: {
          "color": 0xff2222,
          "fields": [{
            "name": "**Error**",
            "value": "Enter command"
          }]
        }
      });
    }
  
  } catch (e) { //Catch errors 
    if (!message.content === "#!reset-prefix") {
      message.channel.send({
        embed: {
          "color": 0xff2222,
          "fields": [{
            "name": "**Error**",
            "value": "Something went wrong \n" + e
          }]
        }
      });
    }
  }
});
  

bot.commands = new Discord.Collection(); // Collection for all commands
bot.aliases = new Discord.Collection(); // Collection for all aliases of every command

  modules.forEach(c => {
    fs.readdir(`./commands/${c}/`, (err, files) => { // Here we go through all folders (modules)
      if (err) throw err; // If there is error, throw an error in the console
      console.log(`[Categoria] Se detectaron ${files.length} comandos en el modulo: ${c}`); // When commands of a module are successfully loaded, you can see it in the console
      
  let jsfiles = files.filter (f => f.split(".").pop() === "js")
    if(jsfiles.length <= 0) {
      return console.log("[LOGS] Couldn't Find Commands!");
    }
      
    jsfiles.forEach((f, i) => { // Now we go through all files of a folder (module)
    // require the file itself in memory
    let pull = require(`./commands/${c}/${f}`);
    console.log(`Comando cargado: ${pull.config.name}. ✅`);
    // add the command to the Commands Collection
    bot.commands.set(pull.config.name, pull);
    // Loops through each Alias in that command
    pull.config.aliases.forEach(alias => {
      // add the alias to the Aliases Collection
      bot.aliases.set(alias, pull.config.name);
              });
        });
    });
});

bot.on("message", async message => {
    if(message.author.bot || message.channel.type === "dm") return;
    let prefix = config[message.guild.id].prefix;
    let messageArray = message.content.split(" ")
    let cmd = messageArray[0];
    let args = messageArray.slice(1);     
    let ops = { 
      ownerId: process.env.OID,
      active: active
    }
  
  if(!message.content.startsWith(prefix)) return;
    let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)))
    if(commandfile) commandfile.run(bot, message, args, ops)
});

bot.on('ready', () => {
  console.log("Windzix ha sido cargado completamente.");
bot.user.setActivity('#help', { type: 'WATCHING' })
  .then(presence => console.log(`Actividad establecida en ${presence.game ? presence.game.name : 'none'}`))
  .catch(console.error);
});

bot.login(process.env.TOKEN);

/* ########################################################## */