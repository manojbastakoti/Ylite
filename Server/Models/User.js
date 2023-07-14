const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  token: {
    type: String,
  },
  type: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
