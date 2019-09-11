const Discord = require("discord.js");
const math = require('mathjs');

exports.run = async (client, message, args) => {
    const expression = args.join(" ");
        try {
            const solved = math.eval(expression).toString();
            return message.channel.send("La respuesta es: " + solved);
        } catch (err) {
            return message.channel.send('Usa `#math [cuenta]`');
        }
}

exports.config = {
	name: "math",
	aliases: ['calculadora', 'calc']
}