const express = require('express');

const app = express();

var AuthController = require("../controllers/auth")

app.post('/login', async(req, res)=>{
    res.json(await AuthController.login(req));
});

module.exports = app;