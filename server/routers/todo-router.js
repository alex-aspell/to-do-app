const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const bodyParser = require('body-parser');


router.get('/', (request,response) => {
    const sqlText = 'SELECT * FROM todo';
    pool.query(sqlText)
    .then((result) => {
        console.log('Got list', result);
        response.send(result.rows);
    })
    .catch((result) => {
        console.log('Did not get list');
        response.sendStatus(500);
    })
})
module.exports = router; 