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

app.listen(process.env.PORT);

setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`); 
}, 280000);

/* ########################################################## */

const Discord = require('discord.js'); // Require discord.js
const bot = new Discord.Client(); // Discord.js Client (Bot)
const modules = ['misc', 'owner', 'nsfw', 'fun', 'util', 'config']; // This will be the list of the names of all modules (folder) your bot owns
const fs = require('fs'); // Require fs to go throw all folder and files

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

bot.on('ready', () => {
  console.log("Windzix ha sido cargado completamente.");
bot.user.setActivity('w!help', { type: 'WATCHING' })
  .then(presence => console.log(`Actividad establecida en ${presence.game ? presence.game.name : 'none'}`))
  .catch(console.error);
});

bot.on("message", async message => {
	if(message.author.bot || message.channel.type === "dm") return;
  let prefixes = require("./settings/json/prefixes.json");
	let prefix = prefixes[message.guild.id].prefixes;
	let messageArray = message.content.split(" ")
	let cmd = messageArray[0];
	let args = messageArray.slice(1);
  
  if(!message.content.startsWith(prefix)) return;
	let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)))
	if(commandfile) commandfile.run(bot, message, args)
});

bot.login(process.env.TOKEN);

/* ########################################################## */