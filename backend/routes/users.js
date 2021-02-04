const express = require('express');
const Usuario = require('../models/user');
const { verifyToken } = require('../middlewares');

const app = express();

var UserController = require("../controllers/users")

app.get('/usuario', verifyToken, async(req, res)=>{
    res.json(await UserController.getUsers(req));
});

app.post('/usuario', verifyToken, async(req, res) =>{
    res.json(await UserController.insert(req));
});

app.put('/usuario/:id', verifyToken, async(req, res) => {
    res.json(await UserController.updateUser(req));
});

app.delete('/usuario/:id', function(req, res) {


    let id = req.params.id;

    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

    let cambiaEstado = {
        estado: false
    };

    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });

    });



});

module.exports = app;