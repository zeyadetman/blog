const errorHandler = require("../../middlewares/error_handlers");
const swagger = require("../../utils/swagger");

const homeRoute = (req, res, next) => {
  res.send("Hi");
};

module.exports = (app) => {
  app.use("/api-docs", swagger.swaggerOptions, swagger.swaggerSpec);
  app.get("/", homeRoute);

  require("./auth")(app);
  require("./work")(app);
  require("./article")(app);
  require("./newsletter")(app);
  require("./me")(app);

  errorHandler(app);
};
