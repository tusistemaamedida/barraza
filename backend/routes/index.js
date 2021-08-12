const express = require("express");
var cron = require("node-cron");

const version = "V1";
const ctrlDeposit = require("../controllers/deposit");

const app = express();

app.use(require("./users"));
app.use(require("./auth"));
app.use(`/${version}/supplies`, require(`./supplies`));
app.use(`/${version}/products`, require(`./products`));
app.use(`/${version}/deposits`, require(`./deposits`));
app.use(`/${version}/lots`, require(`./lots`));
app.use(`/${version}/orders`, require(`./orders`));
app.use(`/${version}/preparations`, require(`./preparations`));

//cronsjobs
cron.schedule("*/10 * * * * *", () => {
  ctrlDeposit.verifyIfCompleteTimeInCamera();
});

module.exports = app;
