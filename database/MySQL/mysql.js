module.exports = (bot, guild) => {
  const mysql = require('mysql')

  const connection = mysql.createConnection({
     host: "sql101.epizy.com",
     user: "epiz_24165230",
     database: "epiz_24165230_windzix",
     password: process.env.MySQLPassword,
     port: 3306
  })

  connection.connect(err => {
    if (err) console.error('error connecting: '+err.stack)
      console.log("Connected!")
  })

  connection.query(`create table ${guild.name}`, (err, results, fields) => {
    console.log(results)
  })
  
  connection.query(`insert ${guild.id}, ${guild.membercount} into ${guild.name}`, (err, results) => {
    console.log(results)
  })
}
