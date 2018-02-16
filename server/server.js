const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 12345; 

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

const toDoRouter = require('./routers/todo-router');

app.listen(port, function(){
    console.log('listening on port', port);
})