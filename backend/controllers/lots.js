const Lots = require("../models/lots");
const uuid4 = require("uuid4");

const getLots = async (status) => {
  let searchParams = {};
  if (status) {
    searchParams = { status };
  }
  return await Lots.find(searchParams);
};

module.exports = { getLots };
