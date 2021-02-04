
const bcrypt = require('bcrypt');
const _ = require('underscore');

const User = require('../models/user');
var util = require('./util');

exports.insert = async(req) => {
    try {
        let body = req.body;
        
        let user = new User({
            name: body.name,
            email: body.email,
            password: bcrypt.hashSync(body.password, 10),
            role: body.role
        });

        let userSaved = await user.save();

        return (userSaved) ? util.getSuccessMsg(userSaved) : util.getErrorMsg({message:"Error en insert user"});
        
    } catch (e) {
        return util.getErrorMsg(e);
    }
}

exports.getUsers = async(req) => {
    try {
        let from = req.query.from || 0;
        from = Number(from);

        let limit = req.query.limit || 15;
        limit = Number(limit);

        let results = await User.find({ status: true }, 'name email role status').skip(from).limit(limit);        
        let total = await User.countDocuments({ status: true });

        return util.getSuccessMsg({users:results,total,from,limit});
        
    } catch (e) {
        return util.getErrorMsg(e);
    }
}

exports.updateUser = async(req) => {
    try {
        let id = req.params.id;
        let body = _.pick(req.body, ['name', 'email', 'role', 'status']);

        let userUpdated = await User.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query'});

        return (userUpdated) ? util.getSuccessMsg(userUpdated) : util.getErrorMsg({message:"Error en update user"});

    } catch (e) {
        return util.getErrorMsg(e);
    }
}