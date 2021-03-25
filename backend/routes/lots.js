const express = require("express");
const routes = express.Router();

const ctrLots = require("../controllers/lots");
const util = require("../controllers/util");

routes.get("/", async (req, resp) => {
  try {
    const { status } = req.query;
    console.log(status);
    let data = await ctrLots.getLots(status);
    return resp.status(200).send(util.getSuccessMsg(data, 200));
  } catch (e) {
    resp.status(500).send(util.getErrorMsg(e));
  }
});

module.exports = routes;
