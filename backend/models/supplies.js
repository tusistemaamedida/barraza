const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let supplies = new Schema({
    id: {
        type: Schema.Types.ObjectId
    },
    uuid: {
        type: String,
        require: [true]
    },
    description: {
        type: String,
        required: [true, 'Se requiere una descripción']
    },
    deleted_at :{
        type: Date,
        required:false
    }
});

module.exports = mongoose.model('Supplies', supplies);