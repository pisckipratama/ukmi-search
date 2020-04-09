const express = require('express');
const router = express.Router();
const moment = require('moment')

moment.locale('id')

module.exports = pool => {
  /* GET home page. */
  router.get('/', (req, res) => {
    pool.query(`SELECT * FROM kader WHERE nim=$1`, [req.query.nim], (err, result) => {
      if (!err) {
        console.log('success retrive all data at ' + moment().format('MMMM Do YYYY, h:mm:ss a'))
        res.render('index', { data: result.rows, moment, url: req.url.length });
      } else {
        console.error(`retrieve fail \n ${JSON.stringify(err, undefined, 2)}`)
        res.send(err)
      }
    })
  })

  router.get('/login', (req, res) => {
    res.render('login');
  });

  router.post('/login', (req, res) => {
    const { username, password } = req.body;
    let sql = `SELECT * FROM users WHERE username=$1`

    pool.query(sql, [username], (err, result) => {
      if (!err) {
        if (result.rows.length > 0) {
          if (result.rows[0].password === password) {
            console.log('mantul')
            res.redirect('/admin')
          } else {
            console.log('password salah')
            res.redirect('/login')
          }
        } else {
          console.log('username eweh')
          res.redirect('/login')
        }
      } else {
        console.error(err)
        res.send(err);
      }
    })
  })

  router.get('/logout', (req, res) => {
    res.redirect('/login')
  })
  
  return router
};
