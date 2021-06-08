const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let products = new Schema({
  id: {
    type: Schema.Types.ObjectId,
  },
  code: {
    type: String,
    required: [true],
  },
  description: {
    type: String,
    required: [true, "Se requiere una descripción"],
  },
  rnpa: {
    type: String,
    default: "",
  },
  id_supplies: {
    type: Schema.Types.ObjectId,
    default: "609aaffbf3014ed6cf09f68a",
  },
  expiration_day: {
    type: Number,
    default: 0,
  },
  label_per_piece: {
    type: Boolean,
    default: false,
  },
  label_quantity_per_piece: {
    type: Number,
    default: 0,
  },
  box_label: {
    type: Boolean,
    default: false,
  },
  piece_box: {
    type: Number,
    default: 0,
  },
  label_pallet: {
    type: Boolean,
    default: false,
  },
  box_pallet: {
    type: Number,
    default: 0,
  },
  amount_label_pallet: {
    type: Number,
    default: 0,
  },
  barcode_product_gs1: {
    type: String,
    default: "",
  },
  barcode_box_gs1: {
    type: String,
    default: "",
  },
  image_product: {
    type: String,
    default: "",
  },
  deleted_at: {
    type: Date,
    required: false,
  },
});

module.exports = mongoose.model("Products", products);
