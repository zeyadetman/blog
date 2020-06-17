const getWorkHistoryRoute = (req, res, next) => {};

module.exports = (app) => {
  /**
   * @swagger
   * /work:
   *  get:
   *    tags:
   *      - Work
   *    description: Get work history
   *    summary: Get work history
   *    responses:
   *      '200':
   *        description: List of all work history
   */
  app.get("/work", getWorkHistoryRoute);

  /**
   * @swagger
   * /work :
   *  post:
   *    tags:
   *      - Work
   *    description: Add new work
   *    summary: Add new work
   *    responses:
   *      '200':
   *        description: created work
   */
  app.post("/work", getWorkHistoryRoute);

  /**
   * @swagger
   * /work/:id :
   *  put:
   *    tags:
   *      - Work
   *    description: Update Work by id
   *    summary: Update Work by id
   *    responses:
   *      '200':
   *        description: Updated Work
   */
  app.put("/work/:id", getWorkHistoryRoute);

  /**
   * @swagger
   * /work/:id :
   *  get:
   *    tags:
   *      - Work
   *    description: Delete Work by id
   *    summary: Delete Work by id
   *    responses:
   *      '200':
   *        description: List of all work history
   */
  app.delete("/work/:id", getWorkHistoryRoute);
};
