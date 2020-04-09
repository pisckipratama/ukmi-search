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

  return router
};
