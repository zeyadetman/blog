const logger = require("../utils/logger");
module.exports = (app) => {
  app.use(function (error, req, res, next) {
    res.status(error.status || 500).send(error);
  });
};
