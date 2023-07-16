const { createToken } = require("../utils");
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

const loginUser = async (req, res) => {
  const body = req.body;

  const user = await UserModel.findOne({ email: body.email });
  if (!user) {
    res.json({
      success: false,
      message: "Invalid User!",
      user,
    });
    return false;
  }

  const result = await user.comparePassword(body.password);
  if (!result) {
    res.json({
      success: false,
      message: "Email or Password is wrong!",
    });
    return false;
  }

  const token = createToken({
    data: {
      user_id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });

  user.token = token;
  await user.save();

  res.cookie("auth", token);

  res.json({
    success: true,
    message: "Login successful",
    data: {
      token,
      user_id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;

    const userInfo = await UserModel.findById(id).select("-password");
    res.json({
      userInfo,
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  addUser,
  loginUser,
  getUserById,
};
