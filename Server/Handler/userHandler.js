const { createToken, verifyToken } = require("../utils");
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

const getProfile = async (req, res) => {
  try {
    // const id = req.user._id
    // const profileInfo=await UserModel.findById(id).select("-password")
    const token = req.body.token;
    // console.log(token)
    if (!token)
      return res.json({
        success: false,
        message: "No User Found!",
      });
    const tokenInfo = await verifyToken(token);
    // console.log(tokenInfo);
    return res.json({
      success: true,
      data: tokenInfo.data,
    });
  } catch (error) {
    console.log(error);
  }
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

const deleteUserById = async (req, res) => {
  try {
    const id = req.params.id;

    const deleteUser = await UserModel.findByIdAndRemove(id);
    res.json({
      success: true,
      message: "User deleted successfully",
      deleteUser,
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  addUser,
  loginUser,
  getProfile,
  getUserById,
  deleteUserById,
};
