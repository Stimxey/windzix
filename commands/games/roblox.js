const Discord = require("discord.js");
const snekfetch = require('snekfetch');

exports.run = (client, message, args) => {
        let saybot = args.join('_');
        const url = `https://api.roblox.com/users/get-by-username?username=${saybot}`;
        snekfetch.get(url).then(result => {
              const data = result.body.Id;
              if (saybot.length < 1) return message.channel.send("Necesita proporcionar un nombre de usuario para usar este comando")
              if (result.body.Id === "undefined") return message.channel.send("No se pudo encontrar un usuario de roblox con el nombre de " + saybot)
              const url2 = `https://api.roblox.com/ownership/hasasset?userId=${data}&assetId=102611803`;
              snekfetch.get(url2).then(a => {
                const Verifiedcheck = a.body
                  const embed = new Discord.RichEmbed()
                  .setColor(0x00A2E8)
                  .setTitle("Nombre: " + saybot)
                  .setDescription("ID: " + data)
                  .addField("Verificado", Verifiedcheck)
                  .setFooter("Link del perfil: " + `https://web.roblox.com/users/${data}/profile`)
                  .setThumbnail("https://roblox.com/Thumbs/BCOverlay.ashx?username=" + saybot)
                  .setImage("http://www.roblox.com/Thumbs/Avatar.ashx?x=100&y=100&Format=Png&username=" + saybot);
                  message.channel.send({embed}).catch(console.error);
                })
            }) 
  };

exports.config = {
  name: "roblox",
  aliases: []
}