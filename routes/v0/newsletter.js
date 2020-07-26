const requestHandler = require("../request_handlers/newsletter");
const { getAllEmails, addNewEmail, removeEmail, sendToAll } = requestHandler;

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
  app.get("/newsletter", getAllEmails);

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
  app.post("/newsletter", addNewEmail);

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
  app.delete("/newsletter/:email", removeEmail);

  /**
   * @swagger
   * /newsletter :
   *  post:
   *    tags:
   *      - NewsLetter
   *    description: Send Email to Newsletter list
   *    summary: Send Email to Newsletter list
   *    responses:
   *      '200':
   *        description: success
   */
  app.post("/newsletter/send", sendToAll);
};
