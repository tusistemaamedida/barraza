const moment = require("moment");
const Products = require("../models/products");

async function getAll(req) {
  let { pagination } = req.body;
  return await Products.find({ deleted_at: null })
    .skip(pagination.from)
    .limit(pagination.limit);
}

async function getById(id) {
  return await Products.find({ _id: id, deleted_at: null });
}

async function getByInternalId(id) {
  return await Products.findOne({ code: id, deleted_at: null });
}

async function save(body) {
  let supplie = new Products({
    description: body.description,
    code: body.code,
    rnpa: body.rnpa,
    id_supplies: body.id_supplies,
    expiration_day: body.expiration_day,
    label_per_piece: body.label_per_piece,
    label_quantity_per_piece: body.label_quantity_per_piece,
    box_label: body.box_label,
    piece_box: body.piece_box,
    label_pallet: body.label_pallet,
    box_pallet: body.box_pallet,
    amount_label_pallet: body.amount_label_pallet,
    barcode_product_gs1: body.barcode_product_gs1,
    barcode_box_gs1: body.barcode_box_gs1,
    image_product: body.image,
  });
  return await supplie.save();
}

async function update(body, id) {
  return await Products.updateOne({ _id: id, deleted_at: null }, body);
}

async function deleted(id) {
  return await Products.updateOne(
    { _id: id },
    { deleted_at: moment().format("YYYY-MM-DD hh:mm:ss") }
  );
}

async function checkIfAvailablesProducts() {
  const listNotAvailables = Products.find({ available: false });
  console.log(listNotAvailables);
}

module.exports = {
  getAll,
  save,
  getById,
  getByInternalId,
  update,
  deleted,
};
