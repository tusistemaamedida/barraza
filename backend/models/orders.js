const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let OrdersSchema = new Schema({
  number: {
    type: String,
    require: [true, "Se requiere un nro. de pedido"],
  },
  client: {
    type: String,
    required: [true, "Se requiere un cliente"],
  },
  cuit: {
    type: String,
  },
  status: {
    type: String,
    default: "SOLICITADO",
    enum: {
      values: ["SOLICITADO", "EN PREPARACION"],
      message: "{VALUE} no es un estado válido",
    },
  },
  products: Schema.Types.Mixed,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: {
    type: Date,
    required: false,
  },
});

module.exports = mongoose.model("Orders", OrdersSchema);
