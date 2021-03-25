const express = require("express");

const app = express();

app.use(require("./users"));
app.use(require("./auth"));
app.use("/v1/supplies", require("./supplies"));
app.use("/v1/products", require("./products"));
app.use("/v1/deposits", require("./deposits"));
app.use("/v1/lots", require("./lots"));

module.exports = app;
