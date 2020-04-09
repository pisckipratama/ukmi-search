var express = require('express');
var router = express.Router();
var moment = require('moment')

var db = require('../config')
moment.locale('id')

/* GET home page. */
router.get('/', (req, res) => {
  console.log(req.url.length)
  db.query(`SELECT * FROM kader WHERE nim=?`, [req.query.nim], (err, rows, fields) => {
    if (!err) {
      console.log('success retrive all data at ' + moment().format('MMMM Do YYYY, h:mm:ss a'))
      res.render('index', { data: rows, moment, url: req.url.length });
    } else {
      console.error(`retrieve fail \n ${JSON.stringify(err, undefined, 2)}`)
      res.send(err)
    }
  })
})

module.exports = router;
