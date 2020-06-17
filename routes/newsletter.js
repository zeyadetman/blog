const getAllNewsletterEmails = (req, res, next) => {};

module.exports = (app) => {
  /**
   * @swagger
   * /newsletter:
   *  get:
   *    tags:
   *      - NewsLetter
   *    description: Get All Newsletter emails
   *    summary: Get All Newsletter emails
   *    responses:
   *      '200':
   *        description: List of all emails
   */
  app.get("/newsletter", getAllNewsletterEmails);

  /**
   * @swagger
   * /newsletter:
   *  post:
   *    tags:
   *      - NewsLetter
   *    description: Add new Newsletter email
   *    summary: Add new Newsletter email
   *    responses:
   *      '200':
   *        description: Return the created email
   */
  app.post("/newsletter", getAllNewsletterEmails);

  /**
   * @swagger
   * /newsletter/:email :
   *  delete:
   *    tags:
   *      - NewsLetter
   *    description: Delete Newsletter email
   *    summary: Delete Newsletter email
   *    responses:
   *      '200':
   *        description: List of all emails
   */
  app.delete("/newsletter/:email", getAllNewsletterEmails);
};
