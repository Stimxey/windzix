const Discord = require("discord.js");
const snek = require('snekfetch');
const fsn = require('fs-nextra');

exports.run = async (client, message, args) => {
  if (!message.guild.member(client.user).hasPermission('ATTACH_FILES')) return message.reply('Lo siento, no tengo los permisos para hacer este comando, necesito adjuntar archivos. :x:')
   const { Canvas } = require('canvas-constructor');
    if (message.mentions.users.size < 1) return message.channel.send("No mencionaste a un usuario para respetarlos");
   const getSlapped = async (person) => {
    const plate = await fsn.readFile('./img/image_respects.png');
    const png = person.replace(/\.(gif|jpg|png|jpeg)\?size=2048/g, '.png?size=128');
    const { body } = await snek.get(png);
    return new Canvas(720, 405)
    .addRect(0, 0, 720, 405)
    .setColor('#000000')
    .addImage(body, 110, 45, 90, 90)
    .resetTransformation()
    .addImage(plate, 0, 0, 720, 405)
    .toBuffer();
  }
     try {
    const person = message.mentions.users.first().avatarURL;
    const result = await getSlapped(person);
    await message.channel.send({ files: [{ attachment: result, name: 'rip.png' }] });
  } catch (error) {
    throw error;
  }
}

exports.config = {
  name: "rip",
  aliases: ['F']
}