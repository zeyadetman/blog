const requestHandler = require("./request_handlers/article");
const { getAllArticles, createNewArticle, deleteArticleById } = requestHandler;

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
   * /article/{id}:
   *  get:
   *    tags:
   *      - Article
   *    description: Get Article By id
   *    summary: Get Article By id
   *    responses:
   *      '200':
   *        description: Article
   */
  app.get("/article/:id", getAllArticles);

  /**
   * @swagger
   * /article:
   *  post:
   *    tags:
   *      - Article
   *    description: Add new Article
   *    summary: Add new Article
   *    responses:
   *      '200':
   *        description: Created Article
   */
  app.post("/article", createNewArticle);

  /**
   * @swagger
   * /article/{id}:
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
   * /article/{id}:
   *  delete:
   *    tags:
   *      - Article
   *    description: Delete Article by id
   *    summary: Delete Article by id
   *    parameters:
   *      - in: path
   *        name: id
   *        type: string
   *        required: true
   *    responses:
   *      '200':
   *        description: The article deleted succesfully!
   *      '409':
   *        description: There's no article with this id!
   */
  app.delete("/article/:id", deleteArticleById);
};
