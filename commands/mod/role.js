exports.run = async (client, message, args) => {
  var user = message.mentions.members.first(); //User
  var roleName = args.splice(2).join(' ');
  var role = message.guild.roles.find(r => r.name === roleName); //Role Search
  var errors = [
    "Que lindo error...",
    "URGHHH ERRORES OH SI",
    "JODER ERRORES",
    "ERROR TIENE UNA CÁMARA"
  ];

  var userErr = [
    "Necesito un usuario, hey... :confused:",
    "Especificar usuario pls :confused:",
    "Necesito a mi puto usuario para que le dé un puto ROOOOOOOOL! :japanese_goblin:"
  ];

  var roleErr = [
    "Especificar rol por favor :confused:",
    "NECESITO MI PUTO ROL!!! :japanese_goblin:"
  ];

  var already = [
    "Espera, el usuario ya tiene este rol!",
    "Heeey, el usuario ya tiene esto!",
    "¡Creo que no lo sabías pero el usuario ya tiene este rol!"
  ];
  var alreadyNo = [
    "Espera, el usuario no tiene este rol!",
    "Heeey, el usuario no tiene esto!",
    "¡Creo que no lo sabías pero el usuario no tiene este rol!"
  ];

  if (!message.member.hasPermission("MANAGE_ROLES")) return message.reply("No tienes permisos, jaja")

  switch (args[0]) {
    case 'add':
      if (!user) return message.reply(userErr[Math.floor((Math.random() * userErr.length))]); // I need User
      if (!roleName) return message.reply(roleErr[Math.floor((Math.random() * roleErr.length))]); //I need roleName
      if (role == null) role = message.mentions.roles.first();
      if (role == null) return message.reply("No puedo encontrar un rol... :persevere:");
      if (user.roles.has(role.id)) return message.reply(already[Math.floor((Math.random() * already.length))]); //Already have role

      user.addRole(role).then(() => message.reply('Gave :ok_hand:')).catch((err) => message.reply(errors[Math.floor((Math.random() * errors.length))]).then(() => console.log(err)));
      break;
    case 'remove':
      if (!user) return message.reply(userErr[Math.floor((Math.random() * userErr.length))]); // I need User
      if (!roleName) return message.reply(roleErr[Math.floor((Math.random() * roleErr.length))]); //I need roleName
      if (role == null) role = message.mentions.roles.first();
      if (role == null) return message.reply("No puedo encontrar un rol... :persevere:");
      if (!user.roles.has(role.id)) return message.reply(alreadyNo[Math.floor((Math.random() * alreadyNo.length))]);

      user.removeRole(role).then(() => message.reply('De vuelta a papa :ok_hand:')).catch((err) => message.reply(errors[Math.floor((Math.random() * errors.length))]).then(() => console.log(err)));
      break;
    default:
      message.channel.send({
        embed: {
          "description": 'Deberías usar eso como \`role <add>|<remove> <usuario> <rol>\`',
          "color": 0xff2222
        }
      });
  }
}

exports.config = {
  name: "role",
  aliases: []
}