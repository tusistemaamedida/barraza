const express = require('express');

require('../config');
const connectToDatabase = require('../db');

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(require('../routes'));

connectToDatabase();

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});