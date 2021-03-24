const Deposits = require("../models/deposit");
const uuid4 = require("uuid4");

async function getDeposit(column, street) {
  return await Deposits.find({
    street: street,
    column: column,
    deleted_at: null,
  });
}

async function save(body) {
  let count = await validate(body.street, body.column);

  if (count === 0) {
    if (Array.isArray(body.cards) && body.cards.length > 0) {
      for (let card of body.cards) {
        card.id = uuid4();
      }
    }
    let supplie = new Deposits({
      street: body.street,
      column: body.column,
      title: body.title,
      description: body.description,
      label: body.label,
      deleted_at: null,
      position: body.position,
    });
    return await supplie.save();
  }
  return 0;
}

async function validate(street, column) {
  return await Deposits.count({
    street: street,
    column: column,
    deleted_at: null,
  });
}

async function updateCard(body, id) {
  const { street, column, position } = body;
  let ok = false;
  if (street != 0 && column != 0 && position != 0) {
    let count = await Deposits.count({
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

module.exports = {
  getDeposit,
  save,
  updateCard,
};
