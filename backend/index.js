const express = require('express');
const fileUpload = require('express-fileupload')

require('./config');
const connectToDatabase = require('./db');

const app = express();
app.use(fileUpload())

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
console.log('/static',__dirname + '/images')
// http://localhost:3100/images/1b57a3ff-eb4a-404e-bde6-6bbd74e43f7f.png
app.use('/images',express.static(__dirname + '/images'))
app.use(require('./routes'));


connectToDatabase();

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});