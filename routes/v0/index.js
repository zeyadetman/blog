const errorHandler = require("../../middlewares/error_handlers");
const swagger = require("../../utils/swagger");
const { authMiddleWare } = require("../../middlewares/auth");

const homeRoute = (req, res, next) => {
  res.send("Hi");
};

module.exports = (app) => {
  app.use("/api-docs", swagger.swaggerOptions, swagger.swaggerSpec);
  app.get("/", homeRoute);

  require("./auth")(app);

  app.get("/profile", authMiddleWare, (req, res, next) => {
    res.json({
      message: "You made it to the secure route",
      user: req.user,
      token: req.query.secret_token,
    });
  });

  require("./auth")(app);
  require("./work")(app);
  require("./article")(app);
  require("./newsletter")(app);
  require("./me")(app);

  errorHandler(app);
};
