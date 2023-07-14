const express = require("express");
const { addUser, loginUser } = require("./Handler/userHandler");
const app = express();
require("./Database/connection");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//user
app.post("/register", addUser);
app.post("/login", loginUser);

const port = 8000;
app.listen(port, function () {
  console.log("Server listening on port" + port);
});
