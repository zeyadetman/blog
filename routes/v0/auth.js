const login = (req, res, next) => {};

module.exports = (app) => {
  /**
   * @swagger
   * /login:
   *  post:
   *    tags:
   *      - Admin
   *    description: Admin Login
   *    summary: Admin Login
   *    responses:
   *      '200':
   *        description: Admin Login
   */
  app.get("/login", login);
};
