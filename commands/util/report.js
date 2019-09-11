const Discord = require("discord.js");
const bot = new Discord.Client();

exports.run = async (client, message, args) => {

var cooldownUsers = [];

const checkCooldown = ((userId) => {
    if (cooldownUsers.indexOf(userId) > -1) {
        return true;
    } else {
        return false;
    }
});

const removeCooldown = ((userId, timeInSeconds) => {
    let index = cooldownUsers.indexOf(userId);
    if (index > -1) {
        setTimeout(() => {
            cooldownUsers = cooldownUsers.splice(index, 0);
        }, timeInSeconds * 1000)
    }
});

if (checkCooldown(message.author.id)) {
    message.channel.send("¡Lo siento! Espere otros 10 segundos para informar nuevamente.");
    return;
}
cooldownUsers.push(message.author.id);
removeCooldown(message.author.id, 10000);
    let member = message.mentions.members.first();
    if (message.author.id == member.id) return message.channel.send("No puedo denunciarme. :x:")
    let reason = args.slice(1).join(" ") || `El moderador no dio una razón.`;
    if (message.mentions.users.size < 1) return message.channel.send("No mencionó a un usuario para informar.")
    let modlog = message.guild.channels.find(c => c.name === "reportes");
    const embed = new Discord.RichEmbed()
        .setColor(0x00A2E8)
        .setTitle("Acción: Informe")
        .addField("Reportado por:", message.author.tag + " (ID: " + message.author.id + ")")
        .addField("Usuario informado:", member.user.username + " (ID: " + member.id + ")")
        .addField("Razón", reason, true)
        .setFooter("Tiempo reportado: " + message.createdAt.toDateString())
        if (!modlog) return;
  message.channel.send("El usuario ha sido reportado, será revisado pronto.")
  client.channels.get(modlog.id).send({embed});
}

exports.config = {
  name: "report",
  aliases: ['reportar']
}