const getMeInfo = (req, res, next) => {};

module.exports = (app) => {
  /**
   * @swagger
   * /me:
   *  get:
   *    tags:
   *      - Me Info
   *    description: Get Me Information
   *    summary: Get Me Information
   *    responses:
   *      '200':
   *        description: Get Me Information
   */
  app.get("/me", getMeInfo);

  /**
   * @swagger
   * /me:
   *  put:
   *    tags:
   *      - Me Info
   *    description: Update Me Information
   *    summary: Update Me Information
   *    responses:
   *      '200':
   *        description: Me Information
   */
  app.put("/me", getMeInfo);
};
