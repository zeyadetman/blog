require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require('cors')

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const app = express();
app.use(cors())

require("./auth/auth");
app.use(morgan("dev"));
app.use(express.json());

require("./routes/v0")(app);

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
