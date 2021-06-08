const moment = require("moment");
const Orders = require("../models/orders");

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

module.exports = {
  getAll,
  save,
  update,
  updateManyStatus,
  find,
};
