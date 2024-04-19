const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION);

    console.log("DB Online");
  } catch (error) {
    console.log(error);

    throw new Error("Error initializing database");
  }
};

module.exports = {
  dbConnection,
};

