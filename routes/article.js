const getAllArticles = (req, res, next) => {};

module.exports = (app) => {
  /**
   * @swagger
   * /articles:
   *  get:
   *    tags:
   *      - Article
   *    description: Get All Articles
   *    summary: Get All Articles
   *    responses:
   *      '200':
   *        description: List of all articles
   */
  app.get("/articles", getAllArticles);

  /**
   * @swagger
   * /article :
   *  post:
   *    tags:
   *      - Article
   *    description: Add new Article
   *    summary: Add new Article
   *    responses:
   *      '200':
   *        description: Created Article
   */
  app.post("/article", getAllArticles);

  /**
   * @swagger
   * /article/:id :
   *  put:
   *    tags:
   *      - Article
   *    description: Update Article by id
   *    summary: Update Article by id
   *    responses:
   *      '200':
   *        description: Updated Article
   */
  app.put("/article/:id", getAllArticles);

  /**
   * @swagger
   * /article/:id :
   *  delete:
   *    tags:
   *      - Article
   *    description: Delete Article by id
   *    summary: Delete Article by id
   *    responses:
   *      '200':
   *        description: List of all articles
   */
  app.delete("/article/:id", getAllArticles);
};
