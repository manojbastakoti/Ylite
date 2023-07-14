const mongoose = require("mongoose");
require("dotenv").config();

const dbConnection = async (req, res) => {
  try {
    await mongoose.connect(process.env.DATABASE_CONNECT);
    console.log("Database Connection Successfull");
  } catch (error) {
    console.log(error);
  }
};

dbConnection();
