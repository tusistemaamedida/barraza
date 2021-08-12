const express = require("express");
const fs = require("fs");
const moment = require("moment");

const { pagination } = require("../middlewares/pagination");
const util = require("../controllers/util");
const ctrPreparations = require("../controllers/preparations");
const PDFDocument = require("../models/pdf-tables");

const routes = express.Router();

//listado de preparaciones
routes.get("/", pagination, async (req, resp) => {
  try {
    let data = await ctrPreparations.getAll(req);
    return resp.status(200).send(util.getSuccessMsg(data, 200));
  } catch (e) {
    resp.status(500).send(util.getErrorMsg(e));
  }
});

routes.get("/:id", async (req, resp) => {
  try {
    let { id } = req.params;
    let data = await ctrPreparations.getDetailsById(id);
    resp.status(200).send(util.getSuccessMsg(data, 200));
  } catch (error) {
    resp.status(500).send(util.getErrorMsg(error));
  }
});

routes.get("/download/:id", async (req, res) => {
  try {
    let { id } = req.params;
    rows = [];
    const doc = new PDFDocument({ bufferPages: true });
    let buffers = [];

    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      let pdfData = Buffer.concat(buffers);
      res
        .writeHead(200, {
          "Content-Length": Buffer.byteLength(pdfData),
          "Content-Type": "application/pdf",
          "Access-Control-Allow-Origin": "*",
          "Content-Disposition": "attachment; filename=out.pdf",
        })
        .end(pdfData);
    });
    doc.pipe(fs.createWriteStream("example.pdf"));

    let data = await ctrPreparations.getDetailsById(id);

    for (let index = 0; index < data.length; index++) {
      const e = data[index];
      rows.push([
        e.nombre,
        e.CobBarraCaja_Int ? e.CobBarraCaja_In : "-",
        e.deposit?.code ? e.deposit.code : "-",
        `${e.deposit?.street ? e.deposit.street : 0} - ${
          e.deposit?.column ? e.deposit.column : 0
        } - ${e.deposit?.position ? e.deposit.position : 0}`,
      ]);
    }
    const table0 = {
      headers: ["Producto", "Caja", "Pallet", "Calle - Col- Alt"],
      rows,
    };

    doc.table(table0, {
      prepareHeader: () => doc.font("Helvetica-Bold"),
      prepareRow: (row, i) => doc.font("Helvetica").fontSize(12),
    });

    doc.text(`Preparación: ${id}`, 40, 20, {
      lineBreak: false,
    });
    doc.text(
      `${moment().format("DD/MM/YY h:mm")} hs.`,
      doc.page.width - 140,
      20,
      {
        lineBreak: false,
      }
    );

    doc.end();
  } catch (error) {
    res.status(500).send(util.getErrorMsg(error));
  }
});

routes.put("/scan", async (req, res) => {
  let {
    body: { id, preparation },
  } = req;

  try {
    let data = false;
    //tengo que detectar de que tipo es el codigo: Pallet, caja o producto
    let typeCode = await ctrPreparations.findTypeByCode(id, preparation);

    if (typeCode) {
      data = await ctrPreparations.scan(typeCode, id, preparation);
    }
    if (data) {
      await ctrPreparations.checkIfComplete(preparation);
      return res.status(200).send(util.getSuccessMsg(data, 200));
    } else {
      return res.status(404).send(util.getErrorMsg(data, 200));
    }
  } catch (e) {
    res.status(500).send(util.getErrorMsg(e));
  }
});

module.exports = routes;
