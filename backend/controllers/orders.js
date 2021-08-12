const Orders = require("../models/orders");
const ProductsDeposit = require("../models/productsDeposit");
const mongoose = require("mongoose");

async function getAll(req) {
  let { pagination } = req.body;
  return await Orders.find({ deleted_at: null })
    .sort({ created_at: -1 })
    .skip(pagination.from)
    .limit(pagination.limit);
}

const save = async (body) => {
  let products = JSON.parse(body.products);
  let order = new Orders({ ...body, products });
  return await order.save();
};

async function update(body, id) {
  return await Orders.updateOne(
    { _id: id, deleted_at: null },
    { ...body, updated_at: new Date() }
  );
}

const updateManyStatus = async (ids, status) => {
  return await Orders.updateMany(
    { _id: { $in: ids } },
    { $set: { status, updated_at: new Date() } },
    { multi: true }
  );
};

const find = async (id) => {
  return await Orders.findById(id);
};

/**
 * @returns listado de productos segun un id de orden
 */
const getProductsByOrderId = async (ids) => {
  try {
    var populate = {
      path: "deposit",
      select: "street column code position",
    };

    const productsDeposit = await ProductsDeposit.find({
      order: { $in: ids.map((id) => mongoose.Types.ObjectId(id)) },
      scan_preparation: true,
      pallet_dispatch: { $ne: null },
    }).populate(populate);
    return productsDeposit;
  } catch (e) {
    console.log(e);
  }
};

/**
 *
 * @returns Un array con los nombres y las cantidades, tipo : "[{name: "Producto 1", code: "ART1", total_prepared: 50, total_unprepared: 10},{name: "Producto 1", code: "ART1", total_prepared: 50, total_unprepared: 10}]
 */
const getProductsAndTotalPreparedByOrderId = async (id) => {
  let prev,
    preparedArray = [];

  let products = await ProductsDeposit.find({
    order: mongoose.Types.ObjectId(id),
  });

  for (let index = 0; index < products.length; index++) {
    const element = products[index];
    if (element.ID_Articulo !== prev) {
      preparedArray.push({
        name: element.nombre,
        code: element.ID_Articulo,
        total_prepared: 0,
        total_unprepared: 0,
      });
    }
    var lastElement = preparedArray[preparedArray.length - 1];
    if (element.pallet_dispatch) {
      lastElement.total_prepared = lastElement.total_prepared + 1;
    } else {
      lastElement.total_unprepared = lastElement.total_unprepared + 1;
    }

    prev = element.ID_Articulo;
  }

  return preparedArray;
};

const checkIfOrderComplete = async (id) => {
  const result = await ProductsDeposit.find({
    _id: mongoose.Types.ObjectId(id),
    pallet_dispatch: null,
  });

  if (result.length > 0) {
    console.log("result", id);
    await Orders.findByIdAndUpdate(id, { status: "PREPARED" });
    return false;
  } else {
    await Orders.findByIdAndUpdate(id, { status: "ARMED" });
    return true;
  }
};

module.exports = {
  getAll,
  save,
  update,
  updateManyStatus,
  find,
  getProductsByOrderId,
  getProductsAndTotalPreparedByOrderId,
  checkIfOrderComplete,
};
