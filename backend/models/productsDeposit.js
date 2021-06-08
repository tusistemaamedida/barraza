const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let products = new Schema({
  ID_Articulo: String,
  nombre: String,
  peso: Number,
  FechaPesaje: String,
  HoraPesaje: String,
  lote: String,
  FechaElaboracion: String,
  CobBarraArt_Int: String,
  CobBarraCaja_Int: String,
  deposit: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Deposit",
  },
  created_at: { type: Date, default: Date.now },
  deleted_at: {
    type: Date,
    required: false,
  },
  available: {
    type: Boolean,
    default: false, //por defecto, cuando ingresa un producto es falso y el cron se encarga de actualizar.
  },
  availableDate: {
    type: Date,
  },
  order: {
    type: Schema.Types.ObjectId,
    default: null,
    ref: "Orders",
  },
  preparation: {
    type: Schema.Types.ObjectId,
    default: null,
    ref: "Preparations",
  },
});

module.exports = mongoose.model("products_deposit", products);
