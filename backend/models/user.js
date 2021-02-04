const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


let validRoles = {
    values: ['ADMIN', 'USER'],
    message: '{VALUE} no es un rol válido'
};

let Schema = mongoose.Schema;


let usuarioSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre del usuario es requerido']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo del usuario es requerido']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es requerido']
    },
    role: {
        type: String,
        default: 'USER',
        enum: validRoles
    },
    status: {
        type: Boolean,
        default: true
    }
});


usuarioSchema.methods.toJSON = function() {

    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}


usuarioSchema.plugin(uniqueValidator, { message: '{PATH} ya existe en BD' });


module.exports = mongoose.model('Usuario', usuarioSchema);