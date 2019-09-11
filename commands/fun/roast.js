const Discord = require("discord.js");
const fs = require("fs-extra");

exports.run = async (client, message, args) => {
    let user = message.mentions.users.first();
    if (message.mentions.users === message.author.username) return message.reply('No te puedes hacer un roast yourself.');
    if (message.mentions.users.size < 1) return message.reply('Debes mencionar a alguien para asarlos.')
    var roast = [
    "naciste en la carretera? Ahí es donde ocurren la mayoría de los accidentes.",
    "te iba a dar una mirada desagradable... pero veo que ya tienes una.",
    "¿Recuerdas cuando te pedí tu opinión? Yo tampoco.",
    "todos tienen derecho a actuar estúpidamente de vez en cuando, pero realmente abusas del privilegio.",
    "estoy tratando de ver las cosas desde tu punto de vista, pero no puedo meter la cabeza tan lejos en mi trasero.",
    "No he visto a un gordo como tú corriendo tan rápido desde que Twinkies salió a la venta por primera vez.",
    "dos errores no corrigen, tome a sus padres como ejemplo.",
    "solo mirándote, ahora entiendo por qué algunos animales comen a sus crías jóvenes.",
    "¿Realmente vuela el tiempo cuando estás teniendo relaciones sexuales, o fue solo un minuto después de todo?",
    "deberías ir a hacer eso mañana. Oh, espera, no importa, ya has cometido suficientes errores por hoy.",
    "es por eso que no tienes cosas buenas.",
    "mi maestro me dijo que borrara los errores, voy a necesitar un borrador más grande.",
    "tu coeficiente intelectual es inferior al tamaño de tu pene.",
    "¿Siempre eres tan idiota, o simplemente presumes cuando estoy cerca?",
    "Hay algunas personas notablemente tontas en este mundo. Gracias por ayudarme a entender eso.",
    "Podría comer un plato de sopa de letras y cagar en una declaración más inteligente que lo que sea que acabas de decir.",
    "eres casi tan útil como una puerta de pantalla en un submarino.",
    "siempre me traes tanta alegría tan pronto como sales de la habitación.",
    "la estupidez no es un crimen, así que siéntete libre de irte.",
    "Si la risa es la mejor medicina, tu cara debe estar curando al mundo.",
    "la única forma en que te acostarás es si te arrastras por el culo de un pollo y esperas.",
    "parece que tu cara se incendió y alguien trató de apagarlo con un martillo.",
    "Los científicos dicen que el universo está formado por neutrones, protones y electrones. Se olvidaron de mencionar a los imbéciles como tú.",
    "¿Por qué es aceptable para ti ser un idiota? pero no para que yo lo señale",
    "eres tan gordo que podrías vender sombra.",
    "su árbol genealógico debe ser un cactus porque todos en él son un pinchazo.",
    "nunca serás el hombre que es tu madre.",
    "solo porque tienes un trasero no significa que debas actuar como tal.",
    "¿Qué posición sexual produce los niños más feos? Pregúntale a tu madre que lo sabe.",
    "si tuviera una cara como la tuya demandaría a mis padres.",
    "El zoológico llamó. ¿Se preguntan cómo saliste de tu jaula?",
    "aww, es tan lindo cuando intentas hablar de cosas que no entiendes.",
    "eres prueba de que la evolución puede ir en reversa.",
    "Los cerebros no lo son todo. En tu caso no son nada.",
    "eres tan feo que cuando te miras en el espejo, tu reflejo mira hacia otro lado.",
    "lo siento, no entendí eso, no hablo idiota.",
    "Es mejor dejar que alguien piense que eres estúpido que abrir la boca y demostrarlo.",
    "¿naciste así de estúpido o tomaste lecciones?",
    "eres una persona tan hermosa, inteligente y maravillosa. Oh, lo siento, pensé que estábamos teniendo una competencia mentirosa.",
    "¿No te cansas de maquillarte dos caras todas las mañanas?",
    "Oye, soy más recto que el palo en el que baila tu madre.",
    "Si la fealdad se midiera en ladrillos, serías la Gran Muralla China.",
    "pensé que te había dicho adiós esta mañana, cuando tiraba en el inodoro",
    "Si estás tratando de mejorar el mundo, debes comenzar contigo mismo. Nada necesita más ayuda que tú",
    "Los zombis están buscando cerebros. No te preocupes Estás seguro.",
    "¿Esparciendo rumores? Al menos has encontrado un pasatiempo que extiende algo más que tus piernas.",
    "te diría que comas basura pero eso es canibalismo",
    "si dijeras lo que piensas, te quedarías sin palabras",
    "Puedo arreglar mi fealdad con cirugía plástica, pero tú, por otro lado, serás estúpido para siempre",
    "actuar como un pene no hará que la tuya sea más grande",
    "si hubiera querido saber de un imbécil, me habría tirado un pedo",
    "Las rosas son rojas. Las violetas son azules. Dios nos hizo hermosos. ¿Qué demonios te pasó?",
    "me recuerdas un centavo, dos caras y sin valor!",
    "He conocido algunos pinchazos en mi tiempo, pero tú, mi amigo, eres el maldito cactus",
    "te abofetearía, pero eso sería maltrato animal",
    "Si vas a ser un sabelotodo, primero debes ser inteligente. De lo contrario, solo eres un idiota. ",
    "sé que estoy hablando como un idiota. Tengo que hacerlo, de lo contrario no me entenderías.",
    "eres tan tonto, tu célula cerebral murió de soledad.",
    "no debes dejar que tu mente divague... es demasiado pequeña para estar sola.",
    "No sé qué te hace tan tonto, pero está funcionando.",
    "deberías ponerte el pañal en la boca, ahí es donde sale la mierda.",
    "sería mucho más agradable si no fuera por ese agujero en la boca del que salen las cosas estúpidas. ",
    "podrías irte, por favor, soy alérgico a los imbéciles",
    "si tuviera alguna inteligencia para cuestionar, ya lo habría cuestionado.",
    "Desearía tener un coeficiente intelectual más bajo, tal vez entonces podría disfrutar de tu compañía.",
    "te respondería pero la vida es muy corta, como tu pene",
    "Los espejos no mienten. Por suerte para ti, tampoco pueden reírse.",
    "tenía razón, no hay humanos en este canal",
    "tienes una cara que ni una madre podría amar...",
    "sabes lo que encontraría si buscara en el diccionario una foto tuya?",
    "haces que los chicos de Jackass se parezcan a Einstein...",
    "te abofetearía pero no quiero que tu cara se vea mejor",
    "lo siento, no puedo poner objetos pequeños en mi boca o me ahogaré",
    "deberías ponerte un condón en la cabeza, si vas a ser un idiota, deberías vestirte como tal",
    "has estado comprando últimamente? Están vendiendo vidas sociales en el centro comercial, deberías conseguir una"
]
    const roasts = roast[Math.floor(Math.random() * roast.length)];
    const embed = new Discord.RichEmbed()
        .setColor(0x00A2E8)
        .setDescription(user.username + ", " + roasts);
    message.channel.send({embed})
  }

exports.config = {
    name: "roast",
    aliases: ['roastyourself', 'yourself', 'rys']
}