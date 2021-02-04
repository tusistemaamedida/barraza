
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
var util = require('./util');

exports.login = async(req) => {
    try {
        let body = req.body;

        let userFind = await User.findOne({ email: body.email });

        if (!userFind) return  util.getErrorMsg({statusCode:404,message:"Usuario no encontrado"});

        if (!bcrypt.compareSync(body.password, userFind.password)) return  util.getErrorMsg({statusCode:400,message:"Usuario y/o password incorrecto/s"});

        let token = jwt.sign({
            user: userFind
        }, process.env.JWTSECRET, { expiresIn: process.env.JWTEXPIRED });
        
        return util.getSuccessMsg({
            user: userFind,
            token
        });
        
    } catch (e) {
        return util.getErrorMsg(e);
    }
}