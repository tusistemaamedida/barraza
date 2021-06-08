const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let deposit = new Schema({
  id: {
    type: Schema.Types.ObjectId,
  },
  street: {
    type: String,
    require: [true, "Se requiere una calle"],
    default: "0",
  },
  column: {
    type: String,
    required: [true, "Se requiere una column"],
    default: "0",
  },
  code: {
    type: String,
    required: [true, "Se requiere un código de pallet"],
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  label: {
    type: String,
  },
  position: {
    type: String,
    default: "0",
  },
  deposit: {
    type: String,
    default: "0",
  },
  created_at: {
    type: String,
    default: Date.now,
  },
  updated_at: { type: Date, default: Date.now },
  deleted_at: {
    type: Date,
    required: false,
  },
  draggable: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Deposits", deposit);
