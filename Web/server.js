if (process.env.NODE_ENV != 'production') {
    require('dotenv').config()
}

const express = require("express");
const path = require("path");
const bodyParse = require("body-parser");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars").engine; 
const ObjectId = require('mongodb').ObjectId;

const app = express();

app.use(bodyParse.json());
app.use(express.static('public'));
app.use(bodyParse.urlencoded({
    extended: true
}));

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error', () => console.log("error in connecting database"));
db.once('open', () => console.log("Connected to Database"));

app.engine('hbs', exphbs({
    extname: '.hbs'
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));