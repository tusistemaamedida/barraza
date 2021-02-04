require('dotenv').config()

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = process.env.URLDB;
} else {
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;