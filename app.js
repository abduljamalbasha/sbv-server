require("dotenv").config();

const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const cors = require("cors");
const connection = require("./database");

app.use(bodyparser.json());
app.use(cors());

userController = require("./api/Controllers/userController1");
checkServer = require("./api/Controllers/checkServer");

app.use("/", express.static(__dirname + "/public"));

app.listen(process.env.SERVER_PORT || 8080, () => {
  console.log(`Am listening Port Id: ${process.env.SERVER_PORT}`);
});

app.use("/", userController);
app.use("/api/servercheck", checkServer);
