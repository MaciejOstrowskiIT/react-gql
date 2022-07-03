const mongoose = require("mongoose");

module.exports = {
  connect: (DB_HOST) => {
    mongoose.connect(DB_HOST);
    mongoose.connection.on("error", (err) => {
      console.log(err);
      console.log("Failed to connect with MongoDB");
      process.exit();
    });
    console.log("Connection with Mongo is fine");
  },
  close: () => {
    mongoose.connection.close();
  },
};
