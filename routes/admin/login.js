const express = require('express');
const router = express.Router();
const moment = require('moment');
const utils = require('../../helpers/utlis');

moment.locale('id')

module.exports = pool => {

  router.get('/', (req, res) => {
    res.render('admin/login', {
      placeholder: "username",
      title: "Admin Panel UKMI",
      button: "login",
      loginMessage: req.flash('loginMessage')
    });
  });

  router.post('/', (req, res) => {
    const { username, password } = req.body;
    let sql = `SELECT * FROM users WHERE username=$1`

    pool.query(sql, [username], (err, result) => {
      if (!err) {
        if (result.rows.length > 0) {
          if (result.rows[0].password === password) {
            console.log('mantul masuk ke admin panel')
            req.session.user = result.rows[0]
            res.redirect('/admin');
          } else {
            console.log('password salah')
            req.flash('loginMessage', 'password salah')
            res.redirect('/panel');
          }
        } else {
          console.log('username tidak ada')
          req.flash('loginMessage', 'username tidak ada')
          res.redirect('/panel');
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
      return res.redirect('/panel');
    })
  })

  return router
};
