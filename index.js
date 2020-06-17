const express = require("express");
const app = express();

require("./routes")(app);

app.listen(3004, () => {
  console.log("3004");
});
