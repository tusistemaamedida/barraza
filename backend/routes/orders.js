const express = require("express");
const fs = require("fs");

const { pagination } = require("../middlewares/pagination");
const util = require("../controllers/util");
const ctrDeposit = require("../controllers/deposit");
const ctrOrders = require("../controllers/orders");
const ctrPreparations = require("../controllers/preparations");

const routes = express.Router();

//listado de pedidos (mas nuevo al mas viejo)
routes.get("/", pagination, async (req, resp) => {
  try {
    let data = await ctrOrders.getAll(req);
    return resp.status(200).send(util.getSuccessMsg(data, 200));
  } catch (e) {
    resp.status(500).send(util.getErrorMsg(e));
  }
});

//obtener el listado de productos escaneados segun una orden
routes.get("/products-armeds&ids=:ids", async (req, resp) => {
  try {
    let { ids } = req.params;
    let data = await ctrOrders.getProductsByOrderId(ids.split(","));
    resp.status(200).send(util.getSuccessMsg(data, 200));
  } catch (error) {
    resp.status(500).send(util.getErrorMsg(error));
  }
});

//agrego un pedido
routes.post("/", async (req, resp) => {
  let { body } = req;
  try {
    const data = await ctrOrders.save(body);
    return resp.status(200).send(util.getSuccessMsg(data, 200));
  } catch (e) {
    resp.status(500).send(util.getErrorMsg(e));
  }
});

routes.put("/sendToPreparation", async (req, resp) => {
  let { body } = req;
  try {
    const ids = body.orders.split(",");
    let productsOnPreparations = [];
    let productsFinalsOnPreparation = [];

    /** mapeo los id y busco la informacion de las ordenes  */
    for (let index = 0; index < ids.length; index++) {
      /** Busco los ids de productos vinculados a las ordenes */
      const currentOrder = await ctrOrders.find(ids[index]);
      currentOrder.products.map((p) => {
        const index = productsOnPreparations.findIndex((pp) => pp.id === p.id);
        if (index > 0) {
          //si existe el producto, sumo la cantidad
          productsOnPreparations[index].quantity =
            productsOnPreparations[index].quantity + p.quantity;
        } else {
          // si no existe el producto, lo sumo al array
          productsOnPreparations.push(p);
        }
      });
    }

    //Busca los productos en deposito disponibles con esos ids.

    for (let index = 0; index < productsOnPreparations.length; index++) {
      const element = productsOnPreparations[index];
      let quantity = productsOnPreparations[index].quantity;
      //Busco todos los articulos con ese code que el {available: true, prepartion: null, order: null  }
      let availablesProducts = await ctrDeposit.getAvailableForPreparationsByCode(
        element.id
      );

      //hay productos??
      if (availablesProducts.length > 0) {
        //Ordeno segun fecha de elaboracion
        availablesProducts = ctrDeposit.sortByDateOfEntry(availablesProducts);

        //ESTO TENGO QUE REPETIRLO HASTA QUE COMPLETE EL PEDIDO
        while (quantity > 0 && availablesProducts.length > 0) {
          //Tomo el primer producto y busco todos los productos de la lista con ese deposit
          let productsOfPallet = availablesProducts.filter(
            (ap) =>
              ap.deposit.toString() === availablesProducts[0].deposit.toString()
          );

          //  Mapeo cada producto y lo inserto en el array de productos finales
          for (let index = 0; index < productsOfPallet.length; index++) {
            if (quantity > 0) {
              const element = productsOfPallet[index];
              productsFinalsOnPreparation.push(productsOfPallet[index]);
              //Descuento a la cantidad pedida 1
              quantity = quantity - 1;
              //Elimino el producto del listado de productos disponible
              availablesProducts = availablesProducts.filter(
                (ap) => ap._id !== element._id
              );
            }
          }
        }
      }
    }

    for (let index = 0; index < ids.length; index++) {
      /** Busco los ids de productos vinculados a las ordenes */
      const currentOrder = await ctrOrders.find(ids[index]);
      console.log("entra en la orden", ids[index]);
      currentOrder.products.map((p) => {
        let quantity = p.quantity;
        while (
          quantity > 0 &&
          productsFinalsOnPreparation.findIndex(
            (pfop) => pfop.ID_Articulo == p.id && !pfop.order
          ) !== -1
        ) {
          let indexElementAvailable = productsFinalsOnPreparation.findIndex(
            (pfop) => pfop.ID_Articulo == p.id && !pfop.order
          );
          productsFinalsOnPreparation[indexElementAvailable].order =
            currentOrder._id;

          quantity = quantity - 1;
        }
      });
    }

    let preparation = await ctrPreparations.save(ids);

    for (let index = 0; index < productsFinalsOnPreparation.length; index++) {
      const element = productsFinalsOnPreparation[index];
      await ctrDeposit.setOrderAndPreparationById(
        element._id,
        element.order,
        preparation
      );
    }

    await ctrOrders.updateManyStatus(ids, body.status);

    return resp.status(200).send(util.getSuccessMsg("Productos editados", 200));
  } catch (error) {
    console.log(error);
    const FileError = fs.createWriteStream("config/errors.txt", {
      flags: "a",
    });
    FileError.write(error.stack + "\r\n\n");
    resp.status(500).send(util.getErrorMsg(error));
  }
});

//edicion de un pedido
routes.put("/:id", async (req, resp) => {
  let { body } = req;
  let { id } = req.params;
  try {
    let data = await ctrOrders.update(body, id);
    if (data.nModified === 0) {
      return resp
        .status(200)
        .send(util.getSuccessMsg("Register not found", 200));
    }
    return resp.status(200).send(util.getSuccessMsg("Register updated", 201));
  } catch (error) {
    resp.status(500).send(util.getErrorMsg(error));
  }
});

routes.put("/:id/assing-pallet", async (req, resp) => {
  try {
    const {
      params: { id },
      body,
    } = req;

    if (!body.code || !body.quantity || !body.pallet) {
      throw new Error("No se encontraron productos ");
    }

    const result = await ctrDeposit.asociatedPalletDispatch(
      id,
      body.code,
      body.quantity,
      body.pallet
    );

    if (!result) {
      throw new Error("No se encontraron productos ");
    }

    await ctrOrders.checkIfOrderComplete(id);

    return resp.status(200).send(util.getSuccessMsg(true, 200));
  } catch (error) {
    resp.status(500).send(util.getErrorMsg(error));
  }
});

routes.get("/:id/products-armed-details/", async (req, resp) => {
  try {
    const {
      params: { id },
    } = req;

    const totals = await ctrOrders.getProductsAndTotalPreparedByOrderId(id);

    return resp.status(200).send(util.getSuccessMsg(totals, 200));
  } catch (error) {
    resp.status(500).send(util.getErrorMsg(error));
  }
});

routes.patch("/unassing-pallet", async (req, resp) => {
  try {
    const { body } = req;
    const result = await ctrDeposit.disassociatePalletDispatch(body.id);

    if (!result) {
      throw new Error("No se encontraron productos ");
    }

    return resp.status(200).send(util.getSuccessMsg(true, 200));
  } catch (error) {
    resp.status(500).send(util.getErrorMsg(error));
  }
});

module.exports = routes;
