const Discord = require("discord.js");

exports.run = async (client, message, args) => {
        if(message.author.id !== process.env.OID) return message.channel.send("Solo el dueño del bot puede utilizar este comando.")
    try {
      var code = args.join(" ");
      if (code === "client.token") return message.channel.send("Dont wanna do that 0_0")
      var evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
      
      const embed = new Discord.RichEmbed()
        .setColor(0x00A2E8)
        .addField(":inbox_tray: Input: ", `\`\`\`${code}\`\`\``)
        .addField(":outbox_tray: output: ", `\`\`\`js\n${clean(evaled)}\n\`\`\``)
      message.channel.send({embed})
    } catch (err) {
      const embed = new Discord.RichEmbed()
      .setColor(0x00A2E8)
      .addField(":inbox_tray: Input: ", `\`\`\`${code}\`\`\``)
      .addField(":outbox_tray: output: ", `\`\`\`${clean(err)}\`\`\``)
    message.channel.send({embed})
    }

function clean(text) {
  if (typeof(text) === 'string')
    return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
  else
      return text;
  }
}

exports.config = {
  name: "eval",
  aliases: []
}