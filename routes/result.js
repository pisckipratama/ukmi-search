const express = require('express');
const router = express.Router();
const moment = require('moment');
const utils = require('../helpers/utlis');

moment.locale('id');

module.exports = pool => {
  /* GET result page for showing data. */
  router.get('/', utils.isLoggedIn, (req, res) => {
    const { user } = req.session
    pool.query(`SELECT * FROM kader WHERE nim=$1`, [user.nim], (err, result) => {
      if (!err) {
        console.log('success retrive all data at ' + moment().format('MMMM Do YYYY, h:mm:ss a'))
        res.render('index', {
          data: result.rows,
          moment,
          url: req.url.length,
          user,
          chgPassMsg: req.flash('chgPassMsg')
        });
      } else {
        console.error(`retrieve fail \n ${JSON.stringify(err, undefined, 2)}`)
        res.send(err)
      };
    });
  });

  /* GET change password page. */
  router.get('/cp', utils.isLoggedIn, (req, res) => {
    const { user } = req.session;
    pool.query(`SELECT * FROM kader WHERE nim=$1`, [user.nim], (err, result) => {
      if (!err) {
        console.log('success retrive all data at ' + moment().format('MMMM Do YYYY, h:mm:ss a'))
        res.render('changepass', {
          data: result.rows,
          moment,
          url: req.url.length,
          user,
          chgPassMsg: req.flash('chgPassMsg')
        });
      };
    });
  });

  /* POST change password */
  router.post('/cp', utils.isLoggedIn, (req, res) => {
    const { user } = req.session;
    const { currentpass, newpass } = req.body;

    let sql = `SELECT * FROM kader WHERE nim=$1`
    pool.query(`SELECT * FROM kader WHERE nim=$1`, [user.nim], (err, result) => {
      if (!err) {
        let data = result.rows[0];
        if (currentpass == data.password) {
          pool.query(`UPDATE kader SET password=$1, dateupdated=NOW() WHERE nim=$2`, [newpass, user.nim], err => {
            if (!err) {
              console.log('user ' + user.nim + ' success changed password at ' + moment().format('MMMM Do YYYY, h:mm:ss a'));
              req.flash('chgPassMsg', 'Password has been changed!');
              res.redirect('/result');
            } else {
              console.log('user ' + user.nim + ' changed password failed at ' + moment().format('MMMM Do YYYY, h:mm:ss a'));
              console.error(`retrieve fail \n ${JSON.stringify(err, undefined, 2)}`);
              res.send(err);
            };
          });
        } else {
          console.log('user ' + user.nim + ' changed password failed at ' + moment().format('MMMM Do YYYY, h:mm:ss a'));
          req.flash('chgPassMsg', 'Current password is wrong, please try again!');
          res.redirect('/result/cp');
        };
      };
    });
  });

  return router;
};
