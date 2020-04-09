const mysql = require('mysql2');

var database = mysql.createConnection({
  host: 'remotemysql.com',
  user: 'otY4HCuT1A',
  password: 'cL2G7Luwfo',
  database: 'otY4HCuT1A'
})

database.connect(err => {
  if (!err) console.log('Database connection success!!')
  else console.error(`database connection fail \n ${JSON.stringify(err, undefined, 2)}`);
})

module.exports = database;