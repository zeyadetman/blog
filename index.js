require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());
require("./routes")(app);

const uri = process.env.DB_URI;
const dbName = process.env.DB_NAME;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once("open", function () {
  console.log("connected!");
});

require("./models/article");

app.listen(3004, () => {
  console.log("3004");
});
