const Discord = require("discord.js");
const Fortnite = require("fortnite");
const fortnite = new Fortnite("f7788827-db01-4a95-be05-93f52cc62485");

exports.run = async (client, message, args) => {
    try {
    const data = await fortnite.getInfo(args.splice(1).join(" "), args[0]);
    const embed = new Discord.RichEmbed()
      .setTitle(`${data.username}, on ${data.platformNameLong}`)
      .setURL(`https://partybus.gg/player/${data.username}`)
      .addField("Escuadrones", `**Top 6 :** ${data.lifetimeStats[3].value}\n**Top 3 :** ${data.lifetimeStats[2].value}\n**Wins:** ${data.stats.p9.top1.value}\n**KD:** ${data.stats.p9.kd.value}\n**Matches Played:** ${data.stats.p9.matches.value}\n**Kills:** ${data.stats.p9.kills.value}\n**Kills Per Game:** ${data.stats.p9.kpg.value}`, true)
      .addField("Duo", `**Top 12 :** ${data.lifetimeStats[4].value}\n**Top 5 :** ${data.lifetimeStats[1].value}\n**Wins:** ${data.stats.p10.top1.value}\n**KD:** ${data.stats.p10.kd.value}\n**Matches Played:** ${data.stats.p10.matches.value}\n**Kills:** ${data.stats.p10.kills.value}\n**Kills Per Game:** ${data.stats.p10.kpg.value}`, true)
      .addField("Solo", `**Top 25 :** ${data.lifetimeStats[5].value}\n**Top 10 :** ${data.lifetimeStats[0].value}\n**Wins:** ${data.stats.p2.top1.value}\n**KD:** ${data.stats.p2.kd.value}\n**Matches Played:** ${data.stats.p2.matches.value}\n**Kills:** ${data.stats.p2.kills.value}\n**Kills Per Game:** ${data.stats.p2.kpg.value}`, true)
      .addBlankField()
      .addField("Puntuación", data.lifetimeStats[6].value, true)
      .addField("Partidos", data.lifetimeStats[7].value, true)
      .addField("Ganadas", data.lifetimeStats[8].value, true)
      .addField("Racha de victorias", data.lifetimeStats[9].value, true)
      .addField("Asesinatos", data.lifetimeStats[10].value, true)
      .addField("KDR", data.lifetimeStats[11].value, true)
      .addField("Asesinato por minutos", data.lifetimeStats[12].value, true)
      .addField("Tiempo jugado", data.lifetimeStats[13].value, true)
      .addField("Tiempo promedio de supervivencia", data.lifetimeStats[14].value, true)
      .setColor(0x00A2E8)
      message.channel.send(embed)
  } catch (error) {
    message.channel.send(`Jugador no encontrado o tipo de formulario no válido.`);
 }
}

exports.config = {
  name: "fortnite",
  aliases: []
}