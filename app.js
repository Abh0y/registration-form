const express = require("express");
const bodyParser = require("body-parser");  
var ejs = require('ejs');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/views'));

var index = require('./routes/index');
app.use('/', index);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
