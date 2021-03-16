const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let deposit = new Schema({
    id: {
        type: Schema.Types.ObjectId
    },
    street: {
        type: String,
        require: [true, "Se requiere una calle"]
    },
    column: {
        type: String,
        required: [true, 'Se requiere una column']
    },
    cards: {
        type: Array
    },
    deleted_at :{
        type: Date,
        required:false
    }
});

module.exports = mongoose.model('Deposits', deposit);