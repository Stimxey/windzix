const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if(!args[0]) return message.reply("Por favor haga una pregunta completa")
  let replies = ["Es cierto", "Es decididamente así",
										"Sin duda",
										"Sí definitivamente",
										"Como yo lo veo, sí",
										"Más probable",
										"Sí",
										"Las señales apuntan a que sí",
										"Pregunta de nuevo más tarde",
										"Mejor no decirte ahora",
										"No se puede predecir ahora",
										"Concéntrate y pregunta otra vez",
										"No cuentes con ello",
										"Mi respuesta es no",
										"Mis fuentes dicen que no",
										"Muy dudoso"];
  
  let result = Math.floor((Math.random() * replies.length));
  let question = args.slice(0).join(" ");
  let ballembed = new Discord.RichEmbed()
  .setAuthor(message.author.tag)
  .setColor("#42f453")
  .addField("🎱Pregunta", question)
  .addField("🎱Respuesta", replies[result]);
  message.channel.send(ballembed);
}

exports.config = {
  name: "8ball",
  aliases: ['bola8'],
  description: "Comando para hacer preguntas al bot"
};
