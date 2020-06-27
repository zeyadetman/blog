const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    title: "Zeyad Blog API",
    description: "Zeyad's Space on the internet",
    contact: {
      name: "Zeyad Etman",
      email: "zeyadetman@gmail.com",
    },
    license: {
      name: "Apache 2.0",
      url: "https://www.apache.org/licenses/LICENSE-2.0.html",
    },
    version: "0.0.1",
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

const homeRoute = (req, res, next) => {
  res.send("Hi");
};

module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/", homeRoute);
  require("./auth")(app);
  require("./work")(app);
  require("./article")(app);
  require("./newsletter")(app);
  require("./me")(app);
};
