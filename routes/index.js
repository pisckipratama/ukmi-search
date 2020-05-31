const express = require('express');
const router = express.Router();
const moment = require('moment');
const utils = require('../helpers/utlis');

moment.locale('id');

module.exports = pool => {
  /* GET login main page. */
  router.get('/', (req, res) => {
    res.render('login', {
      placeholder: "nim",
      title: "Check Kader UKMI",
      button: "Check",
      loginMessage: req.flash('loginMessage')
    });
  });

  /* POST login and landing to result page. */
  router.post('/', (req, res) => {
    const { nim, password } = req.body;
    let sql = `SELECT * FROM kader WHERE nim=$1`;

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
          };
        } else {
          console.log('username eweh')
          req.flash('loginMessage', 'username tidak ada')
          res.redirect('/')
        };
      } else {
        console.error(err)
        res.send(err);
      };
    });
  });
  
  /* GET logout and landing to login page. */
  router.get('/signout', utils.isLoggedIn, (req, res) => {
    req.session.destroy((err) => {
      if (err) res.send(err);
      return res.redirect('/');
    });
  });

  return router;
};
