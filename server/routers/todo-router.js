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

router.post('/add', (request, response) => {
    const newItem = request.body;
    console.log('New item added', newItem);
    const sqlText = `INSERT INTO todo (thing_todo, date, completion)
        VALUES ($1, $2, $3)`;
    pool.query(sqlText, [newItem.thing_todo, newItem.date, newItem.completion])
    .then((result) => {
        console.log('newItem added', result);
        response.sendStatus(200);
    })
    .catch((result) => {
        console.log('Item not added');
        response.sendStatus(500);
    })
})

router.delete('/delete/:id', (request, response) => {
    const id = request.params.id;
    const sqlText = 'DELETE FROM todo WHERE id=$1';
    pool.query(sqlText, [id])
    .then((result) => {
        console.log('Item deleted', id);
        response.sendStatus(201);
    })
    .catch((result) => {
        console.log('Delete failed');
        response.sendStatus(500);
    })
})

router.put('/complete/:id', (request, response) => {
    const id = request.params.id; 
    const sqlText = `UPDATE todo SET completion='c' WHERE id=$1`;
    pool.query(sqlText, [id])
    .then((result) => {
        console.log('completion updated');
        response.sendStatus(200);
    }) 
    .catch((result) => {
        console.log('not completed');
        response.sendStatus(500);
    })
})

module.exports = router; 