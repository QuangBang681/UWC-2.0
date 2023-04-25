const db = require('./config/db');

db.connect();

const express = require('express');
const path = require('path');
const bodyParse = require('body-parser');

const exphbs = require('express-handlebars').engine; 
const ObjectId = require('mongodb').ObjectId;

const app = express();
const port = 5000;

const route = require('./routes');

app.use(bodyParse.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParse.urlencoded({
    extended: true
}));

app.engine('hbs', exphbs({
    extname: '.hbs'
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

route(app);

app.listen(port, () => console.log(`Listening on ${port}`));