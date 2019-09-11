const Discord = require("discord.js");
const snek = require('snekfetch');
const fsn = require('fs-nextra');

exports.run = async (client, message, args) => {
  if (!message.guild.member(client.user).hasPermission('ATTACH_FILES')) return message.reply('Lo siento, no tengo los permisos para hacer este comando, necesito adjuntar archivos. :x:')
   const { Canvas } = require('canvas-constructor');
    if (message.mentions.users.size < 1) return message.channel.send("Tienes que mencionar a un usuario para aprovarlo.");
   const getSlapped = async (person) => {
    const plate = await fsn.readFile('./img/approved.png');
    const png = person.replace('.gif', '.png');
    const { body } = await snek.get(png);
    return new Canvas(250, 250)
    .resetTransformation()
    .addImage(body, 0, 0, 250, 250)
    .addImage(plate, 0, 0, 250, 250)
    .toBuffer();
  }
     try {
    const person = message.mentions.users.first().avatarURL;
    const result = await getSlapped(person);
    await message.channel.send({ files: [{ attachment: result, name: 'approved.png' }] });
  } catch (error) {
    throw error;
  }
}

exports.config = {
  name: "approved",
  aliases: ['aprovado']
}