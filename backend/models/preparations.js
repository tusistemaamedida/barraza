const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let preparations = new Schema({
  created_at: { type: Date, default: Date.now },
  orders: [{}],
  deleted_at: {
    type: Date,
    required: false,
  },
  number: {
    type: Number,
  },
  status: {
    type: String,
    enum: ["PENDING", "CLOSED"],
    default: "PENDING",
  },
});

module.exports = mongoose.model("preparations", preparations);
