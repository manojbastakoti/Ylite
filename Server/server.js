const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const {
  addUser,
  loginUser,
  getUserById,
  deleteUserById,
  getProfile,
} = require("./Handler/userHandler");
const { authenticateToken } = require("./middleware/authenticate");
const {
  addPost,
  editPost,
  deletePost,
  addViews,
  getPosts,
  getPostById,
} = require("./Handler/postHandler");
const fileUpload = require("express-fileupload");
const { addComment, getComments } = require("./Handler/commentHandler");
const app = express();
require("./Database/connection");

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());

app.use("/uploads", express.static("uploads"));

//user
app.post("/register", addUser);
app.post("/login", loginUser);
app.get("/userInfo/:id", authenticateToken, getUserById);
app.delete("/delete_user/:id", authenticateToken, deleteUserById);

//Profile_info
app.post("/profile_info", authenticateToken, getProfile);

//post
app.post("/addpost", authenticateToken, addPost);
app.put("/editPost/:id", authenticateToken, editPost);
app.delete("/deletePost/:id", authenticateToken, deletePost);
app.get("/posts", getPosts);
app.get("/post/:id", getPostById);

//add-views
app.post("/add_views/:id", addViews);

// comments
app.post("/comment/add", authenticateToken, addComment);
app.get("/comment/:postId", getComments);

const port = 8000;
app.listen(port, function () {
  console.log("Server listening on port" + port);
});
