const express = require("express");
const cookieParser = require("cookie-parser");
const { addUser, loginUser, getUserById } = require("./Handler/userHandler");
const { authenticateToken } = require("./middleware/authenticate");
const app = express();
require("./Database/connection");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

//user
app.post("/register", addUser);
app.post("/login", loginUser);
app.get("/userInfo/:id", authenticateToken, getUserById);
const port = 8000;
app.listen(port, function () {
  console.log("Server listening on port" + port);
});
