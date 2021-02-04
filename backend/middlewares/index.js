const jwt = require('jsonwebtoken');

var util = require('../controllers/util');

let verifyToken = (req, res, next) => {

    let token = req.get('Authentication');

    jwt.verify(token, process.env.JWTSECRET, (err, decoded) => {
        if (err) res.json(util.getErrorMsg({statusCode:401,message:"Token no válido"}));
        req.user = decoded.user;
        next();
    });



};


module.exports = {
    verifyToken
}