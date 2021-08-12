const uuid4 = require("uuid4");
const mongoose = require("mongoose");
const moment = require("moment");
const fs = require("fs");

const Deposits = require("../models/deposit");
const Orders = require("../models/orders");
const productsDeposit = require("../models/productsDeposit");
const ctrlProduct = require("./products");

async function getDeposit(column, street) {
  return await Deposits.find({
    street: street,
    column: column,
    deleted_at: null,
  });
}

async function getDepositById(_id) {
  return await Deposits.findById(_id);
}

async function save(body) {
  let count = await validate(body.street, body.column);

  if (count === 0) {
    if (Array.isArray(body.cards) && body.cards.length > 0) {
      for (let card of body.cards) {
        card.id = uuid4();
      }
    }

    console.log(body.products);
    const products = JSON.parse(body.products);

    try {
      //cargo el deposito
      let deposit = new Deposits({
        street: body.street,
        column: body.column,
        title: `Pallet ${body.code}`,
        description: _generateDescriptionPallet(products),
        label: body.label,
        deleted_at: null,
        position: body.position,
        code: body.code,
      });

      const response = await deposit.save();

      //cargo cada producto del deposito

      for (let index = 0; index < products.length; index++) {
        //calculo la fecha de disponibilidad del producto
        console.log(products[index].ID_Articulo);
        let currentProduct = await ctrlProduct.getByInternalId(
          products[index].ID_Articulo
        );

        //si no existe el producto lo agrego
        if (!currentProduct) {
          const body = {
            code: products[index].ID_Articulo,
            description: products[index].nombre,
          };
          currentProduct = await ctrlProduct.save(body);
        }

        console.log("currentProduct", currentProduct);

        let availableDate = moment().add(currentProduct.expiration_day, "d");
        console.log("exp", currentProduct.expiration_day, availableDate);
        products[index] = {
          ...products[index],
          deposit: response._id,
          availableDate,
        };
      }

      await productsDeposit.insertMany(products);

      return response;
    } catch (e) {
      console.log("Error en transaccion", e);

      return 0;
    }
  }
  return 0;
}

async function validate(street, column) {
  let count = 0;
  if (street != 0 || column != 0) {
    count = await Deposits.count({
      street: street,
      column: column,
      deleted_at: null,
    });
  }

  return count;
}

async function updateCard(body, id) {
  const { street, column, position } = body;
  let ok = false;
  let count = 0;
  if (street != 0 && column != 0 && position != 0) {
    count = await Deposits.count({
      street: street,
      column: column,
      position: position,
    });
  } else {
    count = 0;
  }

  if (count === 0) {
    ok = true;
    return await Deposits.updateOne({ _id: id, deleted_at: null }, body);
  }
  return ok;
}

const _generateDescriptionPallet = (products) => {
  let description = "";

  products.sort((a, b) => {
    return parseInt(a.ID_Articulo) - parseInt(b.ID_Articulo);
  });

  let descriptionArray = getProductsAndQuantities(products);

  descriptionArray.map((d) => {
    description = `${description}${d.name} x ${d.quantity} unid.\n`;
  });

  return description;
};

/**
 *
 * @returns Un array con los nombres y las cantidades, tipo : "[{name: "Producto 1", quantity: 200},{name: "Producto 2", quantity: 100}]
 */
const getProductsAndQuantities = (products) => {
  let prev,
    descriptionArray = [];

  for (let index = 0; index < products.length; index++) {
    if (products[index].ID_Articulo !== prev) {
      descriptionArray.push({ name: products[index].nombre, quantity: 1 });
    } else {
      //le sumo 1 a la cantidad de ese producto
      let lastElement = descriptionArray[descriptionArray.length - 1];
      lastElement.quantity++;
    }

    prev = products[index].ID_Articulo;
  }
  return descriptionArray;
};

const verifyIfCompleteTimeInCamera = async () => {
  try {
    const listNotAvailables = await productsDeposit.find({ available: false });
    for (let index = 0; index < listNotAvailables.length; index++) {
      const element = listNotAvailables[index];
      const fecha = moment().toDate();
      //chequea si la fecha y hora actual supera la del producto disponible
      if (moment(fecha).isAfter(element.availableDate)) {
        await productsDeposit.findByIdAndUpdate(element._id, {
          available: true,
        });
      }
    }
  } catch (e) {
    const FileError = fs.createWriteStream("config/errors.txt", {
      flags: "a",
    });
    FileError.write(e.stack + "\r\n\n");
  }
};

const getAvailableForPreparationsByCode = async (code) => {
  return await productsDeposit.find({
    ID_Articulo: code,
    available: true,
    prepartion: null,
    order: null,
  });
};

const sortByDateOfEntry = (array) => {
  const newArrayOrder = array.sort((left, right) => {
    return moment(left.FechaElaboracion, "YYYY-MM-DD HH:mm:ss").diff(
      moment(right.FechaElaboracion, "YYYY-MM-DD HH:mm:ss")
    );
  });
  return newArrayOrder;
};

const setOrderAndPreparationById = async (idProduct, order, preparation) => {
  try {
    await productsDeposit.findByIdAndUpdate(idProduct, {
      order: order,
      preparation: preparation,
    });
  } catch (e) {
    console.log(e);
  }
};

const asociatedPalletDispatch = async (order, code, quantity, pallet) => {
  try {
    const products = await productsDeposit
      .find({
        order: mongoose.Types.ObjectId(order),
        ID_Articulo: code,
        pallet_dispatch: null,
        scan_preparation: true,
      })
      .limit(parseInt(quantity));

    const productsUpdates = await productsDeposit.updateMany(
      { _id: { $in: products.map((p) => p._id) } },
      { pallet_dispatch: pallet }
    );

    if (productsUpdates.nModified > 0) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
};

const disassociatePalletDispatch = async (id) => {
  try {
    const productsUpdates = await productsDeposit.findByIdAndUpdate(id, {
      pallet_dispatch: null,
    });

    await Orders.findByIdAndUpdate(productsUpdates.order, {
      status: "PREPARED",
    });

    console.log("productsUpdates", productsUpdates);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

module.exports = {
  getDeposit,
  getDepositById,
  save,
  updateCard,
  verifyIfCompleteTimeInCamera,
  getAvailableForPreparationsByCode,
  sortByDateOfEntry,
  setOrderAndPreparationById,
  asociatedPalletDispatch,
  disassociatePalletDispatch,
};
