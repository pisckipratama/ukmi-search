const express = require('express');
const router = express.Router();
const moment = require('moment')

moment.locale('id')

module.exports = pool => {
  /* GET home page. */
  router.get('/result', (req, res) => {
    const { user } = req.session
    pool.query(`SELECT * FROM kader WHERE nim=$1`, [user.nim], (err, result) => {
      if (!err) {
        console.log('success retrive all data at ' + moment().format('MMMM Do YYYY, h:mm:ss a'))
        res.render('index', {
          data: result.rows,
          moment, url: req.url.length,
          user
        });
      } else {
        console.error(`retrieve fail \n ${JSON.stringify(err, undefined, 2)}`)
        res.send(err)
      }
    })
  })

  router.get('/', (req, res) => {
    res.render('login', {
      placeholder: "nim",
      title: "Check Kader UKMI",
      button: "Check",
      loginMessage: req.flash('loginMessage')
    })
  })

  router.post('/', (req, res) => {
    const { nim, password } = req.body;
    let sql = `SELECT * FROM aksesuser WHERE nim=$1`;

    pool.query(sql, [nim], (err, result) => {
      if (!err) {
        if (result.rows.length > 0) {
          if (result.rows[0].password === password) {
            console.log('mantul bisa check user')
            req.session.user = result.rows[0]
            res.redirect('/result')
          } else {
            console.log('password salah')
            req.flash('loginMessage', 'password salah')
            res.redirect('/')
          }
        } else {
          console.log('username eweh')
          req.flash('loginMessage', 'username tidak ada')
          res.redirect('/')
        }
      } else {
        console.error(err)
        res.send(err);
      }
    })
  })

  router.get('/login', (req, res) => {
    res.render('login', {
      placeholder: "username",
      title: "Admin Panel UKMI",
      button: "login",
      loginMessage: req.flash('loginMessage')
    });
  });

  router.post('/login', (req, res) => {
    const { username, password } = req.body;
    let sql = `SELECT * FROM users WHERE username=$1`

    pool.query(sql, [username], (err, result) => {
      if (!err) {
        if (result.rows.length > 0) {
          if (result.rows[0].password === password) {
            console.log('mantul masuk ke admin panel')
            req.session.user = result.rows[0]
            res.redirect('/admin')
          } else {
            console.log('password salah')
            req.flash('loginMessage', 'password salah')
            res.redirect('/login')
          }
        } else {
          console.log('username tidak ada')
          req.flash('loginMessage', 'username tidak ada')
          res.redirect('/login')
        }
      } else {
        console.error(err)
        res.send(err);
      }
    })
  })

  router.get('/logout', (req, res) => {
    req.session.destroy(function (err) {
      if (err) res.send(err);
      return res.redirect('/');
    })
  })

  return router
};
