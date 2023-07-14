const express = require("express");
const { addUser } = require("./Handler/userHandler");
const app = express();
require("./Database/connection");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//user
app.post("/register", addUser);

const port = 8000;
app.listen(port, function () {
  console.log("Server listening on port" + port);
});
