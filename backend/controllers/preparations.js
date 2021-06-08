const moment = require("moment");
const Preparations = require("../models/preparations");
const Orders = require("../models/orders");

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

module.exports = {
  save,
};
