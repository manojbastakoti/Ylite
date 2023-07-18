const express = require("express");
const cookieParser = require("cookie-parser");
const fileupload = require("express-fileupload");
const {
  addUser,
  loginUser,
  getUserById,
  deleteUserById,
} = require("./Handler/userHandler");
const { authenticateToken } = require("./middleware/authenticate");
const { addPost, editPost } = require("./Handler/postHandler");
const fileUpload = require("express-fileupload");
const app = express();
require("./Database/connection");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());

//user
app.post("/register", addUser);
app.post("/login", loginUser);
app.get("/userInfo/:id", authenticateToken, getUserById);
app.delete("/delete_user/:id", authenticateToken, deleteUserById);

//post
app.post("/addpost", authenticateToken, addPost);
app.put("/editPost/:id", authenticateToken, editPost);
const port = 8000;
app.listen(port, function () {
  console.log("Server listening on port" + port);
});
