const moment = require("moment");
const Preparations = require("../models/preparations");
const Orders = require("../models/orders");
const ProductsDeposit = require("../models/productsDeposit");
const Deposits = require("../models/deposit");
const mongoose = require("mongoose");

const getAll = async () => {
  return await Preparations.find({ deleted_at: null }).sort({ created_at: -1 });
};

const save = async (idsOrders) => {
  try {
    let orders = [];
    for (let index = 0; index < idsOrders.length; index++) {
      const element = idsOrders[index];
      const currentOrder = await Orders.findById(element);
      orders.push(currentOrder.number);
    }
    console.log();
    const preparation = await new Preparations({
      orders,
      number: Math.floor(Math.random() * 100000000) + 1,
    });
    return preparation.save();
  } catch (e) {
    console.log(e);
  }
};

/**
 * @returns listado de productos segun un id de preparación
 */
const getDetailsById = async (id) => {
  try {
    var populate = {
      path: "deposit",
      select: "street column code position",
    };

    const productsDeposit = await ProductsDeposit.find({
      preparation: mongoose.Types.ObjectId(id),
    }).populate(populate);

    return productsDeposit;
  } catch (e) {
    console.log(e);
  }
};

/**
 *
 * @param {*} id
 * @param {*} preparation
 * @returns Type: PALLET, BOX, ARTICLE
 */

const findTypeByCode = async (id, preparation) => {
  try {
    //busco pallet
    let exist = await existPalletById(id);
    if (exist) {
      return "PALLET";
    }
    //sino busco box
    exist = await existBoxById(id, preparation);
    if (exist) {
      return "BOX";
    }
    //sino busco articulo
    exist = await existProductById(id, preparation);
    if (exist) {
      return "ARTICLE";
    }
    return false;
  } catch (e) {
    throw new Error("no existe el producto");
  }
};

const existPalletById = async (code) => {
  try {
    //busco pallet
    return await Deposits.findOne(
      {
        code,
      },
      (err, doc) => {
        if (err) {
          return false;
        } else {
          return doc;
        }
      }
    );
  } catch (e) {
    return false;
  }
};

const existBoxById = async (CobBarraCaja_Int, preparation) => {
  try {
    //busco box
    return await ProductsDeposit.findOne({
      CobBarraCaja_Int,
      preparation: mongoose.Types.ObjectId(preparation),
    });
  } catch (e) {
    return false;
  }
};

const existProductById = async (CobBarraArt_Int, preparation) => {
  try {
    //busco producto
    return await ProductsDeposit.findOne({
      CobBarraArt_Int,
      preparation: mongoose.Types.ObjectId(preparation),
    });
  } catch (e) {
    return false;
  }
};
/**
 * @returns boolean para saber si escaneó o no
 */
const scan = async (typeCode, id, preparation) => {
  try {
    switch (typeCode) {
      case "PALLET":
        const pallet = await existPalletById(id);

        await ProductsDeposit.updateMany(
          {
            preparation: mongoose.Types.ObjectId(preparation),
            deposit: mongoose.Types.ObjectId(pallet._id),
          },
          { scan_preparation: true }
        );
        break;

      case "BOX":
        await ProductsDeposit.updateMany(
          {
            preparation: mongoose.Types.ObjectId(preparation),
            CobBarraCaja_Int: id,
          },
          { scan_preparation: true }
        );
        break;

      case "ARTICLE":
        await ProductsDeposit.findOneAndUpdate(
          {
            preparation: mongoose.Types.ObjectId(preparation),
            CobBarraArt_Int: id,
            scan_preparation: false,
          },
          { scan_preparation: true }
        );
        break;

      default:
        return false;
    }
    return true;
  } catch (e) {
    console.log(e);
  }
};

const checkIfComplete = async (preparation) => {
  try {
    const isComplete = await ProductsDeposit.find({
      preparation: mongoose.Types.ObjectId(preparation),
      scan_preparation: false,
    });
    if (isComplete.length == 0) {
      await Preparations.findOneAndUpdate(
        {
          _id: mongoose.Types.ObjectId(preparation),
          status: "PENDING",
        },
        { status: "CLOSED" }
      );
      await completedOrders(preparation);
    }
  } catch (e) {
    console.log(e);
  }
};

const completedOrders = async (preparationId) => {
  const preparation = await Preparations.findById(preparationId);
  console.log(preparation);
  for (let index = 0; index < preparation.orders.length; index++) {
    const number = preparation.orders[index];
    await Orders.findOneAndUpdate(
      { number, status: "EN PREPARACION" },
      { status: "PREPARED" }
    );
  }
};

module.exports = {
  save,
  getAll,
  getDetailsById,
  findTypeByCode,
  scan,
  checkIfComplete,
};
