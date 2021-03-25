const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const validStatusLots = {
  values: ["LIBERADO", "RETENIDO"],
  message: "{VALUE} no es un estado válido",
};

const validAnalysis = {
  values: ["REPROCESO", "DECOMISO", "LIBERADO"],
  message: "{VALUE} no es un resultado de análisis válido",
};

let lotsSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
  },
  pallets: [
    {
      type: String,
      required: [true, "Se requiere al menos un pallet"],
    },
  ],
  status: {
    type: String,
    default: "LIBERADO",
    enum: validStatusLots,
  },
  analysis: {
    type: String,
    enum: validAnalysis,
  },
  notes: [
    {
      type: String,
      required: false,
    },
  ],
  created_at: {
    type: Date,
    required: [true, "Se debe ingresar una fecha de ingreso de lote"],
  },
  deleted_at: {
    type: Date,
    required: false,
  },
});

module.exports = mongoose.model("Lots", lotsSchema);
