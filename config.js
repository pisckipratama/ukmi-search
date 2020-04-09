const mysql = require('mysql2');

var database = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'nopassword',
  database: 'ukmi'
})

database.connect(err => {
  if (!err) console.log('Database connection success!!')
  else console.error(`database connection fail \n ${JSON.stringify(err, undefined, 2)}`);
})

module.exports = database;