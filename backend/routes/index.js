const express = require("express");
var cron = require("node-cron");

const ctrlDeposit = require("../controllers/deposit");

const app = express();

app.use(require("./users"));
app.use(require("./auth"));
app.use("/v1/supplies", require("./supplies"));
app.use("/v1/products", require("./products"));
app.use("/v1/deposits", require("./deposits"));
app.use("/v1/lots", require("./lots"));
app.use("/v1/orders", require("./orders"));

//cronsjobs
cron.schedule("*/10 * * * * *", () => {
  ctrlDeposit.verifyIfCompleteTimeInCamera();
});

module.exports = app;
