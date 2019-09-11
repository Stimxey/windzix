const Discord = require("discord.js");
const fs = require("fs-extra");

exports.run = async (client, message, args) => {
    let user = message.mentions.users.first();
    if (message.mentions.users === message.author.username) return message.reply('No puedes halagar a ti mismo');
    if (message.mentions.users.size < 1) return message.reply('Debes mencionar a alguien para felicitarlos.')
    var roast = [
        "Tu sonrisa es contagiosa.",
        "Te ves muy bien hoy.",
        "Eres una cookie inteligente.",
        "Apuesto a que haces sonreír a los bebés.",
        "Tienes modales impecables.",
        "me gusta tu estilo.",
        "Tienes la mejor risa.",
        "Te aprecio.",
        "Eres el más perfecto que hay.",
        "Tú eres suficiente.",
        "Eres fuerte.",
        "Tu perspectiva es refrescante.",
        "Eres un amigo genial",
        "Iluminas la habitación.",
        "Brillas más que una estrella fugaz.",
        "Te mereces un abrazo ahora mismo.",
        "Deberias estar orgulloso de ti mismo.",
		    "Eres más útil de lo que crees",
        "Tiene un gran sentido del humor.",
        "¡Tienes todos los movimientos correctos!",
        "¿Esa es tu foto al lado de 'encantador' en el diccionario?",
        "Tu amabilidad es un bálsamo para todos los que la encuentran",
        "Eres todo eso y una bolsa de papas fritas de gran tamaño",
        "En una escala del 1 al 10, eres un 11.",
        "Eres valiente.",
        "Eres aún más bella por dentro que por fuera",
        "Tienes el coraje de tus convicciones",
        "Tus ojos son impresionantes",
        "Si los pájaros azules de dibujos animados fueran reales, un montón de ellos estaría sentado sobre tus hombros cantando en este momento",
        "Estás haciendo la diferencia.",
        "Eres como el sol en un día lluvioso",
        "Sacas lo mejor de otras personas",
        "Su capacidad para recordar factoides aleatorios en el momento justo es impresionante",
        "Eres un gran oyente",
        "¿Cómo es que siempre te ves bien, incluso con pantalones de chándal?",
        "¡Todo sería mejor si más personas fueran como tú!",
        "Apuesto a que sudas brillo",
        "Eras genial antes de que los hipsters fueran geniales",
        "Ese color es perfecto para ti",
        "Salir contigo siempre es una maravilla",
        "Siempre sabes, y dices, exactamente lo que necesito escuchar cuando necesito escucharlo",
        "Hueles muy bien",
        "¡Puedes bailar como si nadie estuviera mirando, pero todos están mirando porque eres un bailarín increíble!",
        "Estar cerca de ti hace que todo sea mejor",
        "Cuando dices, 'quise hacer eso', te creo totalmente",
        "Cuando no tienes miedo de ser tú mismo es cuando eres más increíble",
        "Los colores parecen más brillantes cuando estás cerca",
        "Eres más divertido que un hoyo lleno de dulces (y en serio), ¿qué podría ser más divertido que eso?",
        "Lo que no te gusta de ti mismo es lo que te hace tan interesante",
        "Eres maravilloso.",
        "Tienes codos lindos. ¡De verdad!",
	    	"Los chistes son más divertidos cuando les cuentas",
        "Eres mejor que un cono de helado de tres bolas. Con chispas",
        "Tu ombligo es adorable",
        "Tu cabello se ve impresionante",
        "¡Eres único!",
        "Eres inspirador",
        "Si fueras una caja de crayones, serías la marca gigante con el sacapuntas incorporado",
        "Deberías agradecerte más a menudo. ¡¡Así que gracias !!",
        "Nuestra comunidad es mejor porque estás en ella",
        "Alguien está atravesando algo difícil en este momento porque te respaldas",
        "Tienes las mejores ideas.",
        "Siempre sabes cómo encontrar ese lado positivo",
        "Todos a veces son derribados, pero siempre te levantas y sigues adelante",
        "Eres una vela en la oscuridad",
        "Eres un gran ejemplo para los demás",
        "Estar cerca de ti es como estar en unas pequeñas vacaciones felices",
        "Siempre sabes exactamente qué decir",
        "Siempre estás aprendiendo cosas nuevas y tratando de superarte, lo cual es increíble",
        "Si alguien basara un meme de Internet en ti, tendría una gramática impecable",
        "Podrías sobrevivir a un apocalipsis zombi",
        "Eres más divertido que el plástico de burbujas",
        "Cuando cometes un error, lo arreglas",
        "¿Quién te crió? Se merecen una medalla por un trabajo bien hecho",
        "Eres genial para resolver cosas",
        "Tu voz es magnífica",
        "Las personas que amas tienen suerte de tenerte en sus vidas",
        "Eres como un soplo de aire fresco",
        "Eres hermosa, y eso es lo menos interesante de ti también",
		    "Eres tan considerado",
        "Tu potencial creativo parece ilimitado",
        "Tu nombre te queda como una T.",
        "Eres irresistible cuando te sonrojas",
        "Las acciones hablan más que las palabras, y las tuyas cuentan una historia increíble",
        "De alguna manera haces que el tiempo se detenga y vuelas al mismo tiempo",
        "Cuando decides algo, nada se interpone en tu camino",
        "Parece que realmente sabes quién eres",
        "Cualquier equipo sería afortunado de tenerte en él",
        "En la escuela secundaria, apuesto a que te votaron 'es más probable que sigas siendo increíble'",
        "Apuesto a que haces el crucigrama en tinta",
        "Los bebés y los animales pequeños probablemente te quieran",
        "Si fueras una vela perfumada, la llamarían Perfectamente Imperfecta (y olería a verano)",
        "Hay algo ordinario, y luego estás tú",
        "Eres la razón de alguien para sonreír",
        "Eres incluso mejor que un unicornio, porque eres real",
        "¿Cómo sigues siendo tan divertido y haciendo reír a todos?",
        "Tienes una buena cabeza sobre tus hombros",
        "¿Alguien te ha dicho alguna vez que tienes una buena postura?",
        "La forma en que atesoras a tus seres queridos es increíble",
        "Realmente eres algo especial",
        "Eres un regalo para los que te rodean",
]
    const roasts = roast[Math.floor(Math.random() * roast.length)];
    const embed = new Discord.RichEmbed()
        .setColor(0x00A2E8)
        .setDescription(user.username + ", " + roasts);
    message.channel.send({embed})
  }

exports.config = {
    name: "compliment",
    aliases: ['halago']
}