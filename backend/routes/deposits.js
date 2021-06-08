const express = require("express");

const routes = express.Router();
const { pagination } = require("../middlewares/pagination");
const ctrDeposits = require("../controllers/deposit");
const util = require("../controllers/util");

routes.get("/", async (req, resp) => {
  try {
    let { column, street } = req.query;
    console.log(column, street);
    let data = await ctrDeposits.getDeposit(column, street);
    resp.status(200).send(util.getSuccessMsg(data, 200));
  } catch (error) {
    resp.status(500).send(util.getErrorMsg(error));
  }
});

routes.post("/", async (req, resp) => {
  let { body } = req;
  try {
    let data = await ctrDeposits.save(body);

    if (data === 0) {
      return resp
        .status(401)
        .send(
          util.getSuccessMsg(
            { msg: "Ya existe ese deposito con la misma calle o columna" },
            400
          )
        );
    }
    return resp.status(200).send(util.getSuccessMsg(data, 201));
  } catch (error) {
    resp.status(500).send(util.getErrorMsg(error));
  }
});

routes.put("/card/:id", async (req, resp) => {
  let { body } = req;
  let { id } = req.params;
  try {
    let data = await ctrDeposits.updateCard(body, id);
    if (data === false) {
      return resp
        .status(403)
        .send(util.getSuccessMsg("Hay un registro en la misma columna", 403));
    }
    return resp.status(200).send(util.getSuccessMsg("Register updated", 201));
  } catch (error) {
    resp.status(500).send(util.getErrorMsg(error));
  }
});

routes.get("/card/:id", async (req, resp) => {
  let { body } = req;
  let { id } = req.params;
  try {
    let data = await ctrDeposits.updateCard(body, id);
    if (data === false) {
      return resp
        .status(403)
        .send(util.getSuccessMsg("Hay un registro en la misma columna", 403));
    }
    return resp.status(200).send(util.getSuccessMsg("Register updated", 201));
  } catch (error) {
    resp.status(500).send(util.getErrorMsg(error));
  }
});

module.exports = routes;
