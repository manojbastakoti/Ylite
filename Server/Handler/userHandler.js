const UserModel = require("../Models/User");

const addUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const emailAlreadyExists = await UserModel.findOne({
      email: email,
    });
    if (emailAlreadyExists) {
      res.json({
        success: false,
        message: "Email already exists!",
      });
      return false;
    }
    const user = await UserModel.create({
      name,
      email,
      password,
      type: "normal",
    });

    await user.save();
    res.json({
      success: true,
      message: "User added successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addUser,
};
