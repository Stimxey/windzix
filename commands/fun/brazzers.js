const Discord = require("discord.js");
const snek = require('snekfetch');
const fsn = require('fs-nextra');

exports.run = async (client, message, args) => {
  if (!message.guild.member(client.user).hasPermission('ATTACH_FILES')) return message.reply('Lo siento, no tengo los permisos para hacer este comando, necesito adjuntar archivos. :x:')
   const { Canvas } = require('canvas-constructor');
    if (message.mentions.users.size < 1) return message.channel.send("No mencionaste a un usuario para hacerlos hermosos");
   const getSlapped = async (person) => {
    const plate = await fsn.readFile('./img/plate_brazzers.png');
    const png = person.replace('.gif', '.png');
    const { body } = await snek.get(png);
    return new Canvas(634, 675)
    .setColor(0x00A2E8)
    .addRect(0, 0, 634, 675)
    .addImage(body, 0, 0, 634, 675)
    .addImage(plate, 233, 485, 384, 245)
    .toBuffer();
  }
     try {
    const person = message.mentions.users.first().avatarURL;
    const result = await getSlapped(person);
    await message.channel.send({ files: [{ attachment: result, name: 'brazzers.png' }] });
  } catch (error) {
    throw error;
  }
}

exports.config = {
  name: "brazzers",
  aliases: []
}