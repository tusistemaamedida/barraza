const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const MONGODB_URI = process.env.URLDB;
let isConnected;

let options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

module.exports = connectToDatabase = async () => {
  if (isConnected) {
    console.log("=> Mongoose esta usando la conexión ya exixtente");
    return Promise.resolve();
  }

  console.log("=> Mongoose esta usando una nueva conexión");
  return await mongoose.connect(MONGODB_URI, options).then((db) => {
    isConnected = db.connections[0].readyState;
  });
};
