const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let products = new Schema({
    id: {
        type: Schema.Types.ObjectId
    },
    code:{
      type: String,
      required: [true]
    },
    description: {
        type: String,
        required: [true, 'Se requiere una descripción']
    },
    rnpa:{
      type: String,
      required: true
    },
    id_supplies:{
      type: Schema.Types.ObjectId
    },
    expiration_day:{
      type: Number,
      required: true
    },
    label_per_piece:{
      type: Boolean,
      required: true
    },
    label_quantity_per_piece:{
      type: Number,
      required: true
    },
    box_label:{
      type: Boolean,
      required: true
    },
    piece_box:{
      type: Number,
      required: true
    },
    amount_piece_box:{
      type: Number,
      required: true
    },
    label_pallet:{
      type: Boolean,
      required: true
    },
    box_pallet:{
      type: Number,
      required: true
    },
    amount_label_pallet:{
      type: Number,
      required: true
    },
    barcode_product_gs1:{
      type: String,
      required: true
    },
    barcode_box:{
      type: String,
      required: true
    },
    image_product:{
      type: String,
      required: true
    },
    deleted_at :{
        type: Date,
        required:false
    }
});

module.exports = mongoose.model('Products', products);