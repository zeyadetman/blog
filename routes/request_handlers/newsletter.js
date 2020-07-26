const Newsletter = require("../../models/Newsletter");
const logger = require("../../utils/logger");
const LABEL = "Newsletter";
const Joi = require("joi");
const { sendMessage } = require("../../utils/sendmails");

const newsletterSchema = Joi.object({
  email: Joi.string().email().required(),
  isActive: Joi.bool().required(),
});

const messageSchema = Joi.object({
  to: Joi.array().items(Joi.string().email()).required(),
  from: Joi.string().required(),
  subject: Joi.string().required(),
  text: Joi.string().required(),
  html: Joi.string().required(),
});

const getAllEmails = async (req, res, next) => {
  try {
    logger.info({
      message: `Get emails from newsletter`,
      label: LABEL,
    });
    const emails = await Newsletter.find(
      { isActive: true },
      { email: 1, _id: 0 }
    );
    const emailsList = emails.map((email) => email.email);
    return res.send({ emails: emailsList });
  } catch (error) {
    logger.error({ message: `${error}`, label: LABEL });
    return res.status(500).send({ error });
  }
};

const addNewEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const newEmail = { email, isActive: true };
    logger.info({ message: `Add email to newsletter ${email}`, label: LABEL });
    const { error, value } = newsletterSchema.validate(newEmail);

    if (error) {
      logger.error({ message: `${error}`, label: LABEL });
      return res.status(400).send({ error });
    }

    const isEmailExist = await Newsletter.findOne({ email });
    if (isEmailExist) {
      logger.error({ message: `This Email is exist`, label: LABEL });
      return res.status(400).send({ error: "This Email is exist" });
    }

    const emailCreated = await new Newsletter(value);
    await emailCreated.save();

    if (!emailCreated) {
      logger.error({ message: `${error}`, label: LABEL });
      return res.status(400).send({ error });
    }

    return res.send(emailCreated);
  } catch (error) {
    logger.error({ message: `${error}`, label: LABEL });
    return res.status(500).send({ error });
  }
};

const removeEmail = async (req, res, next) => {
  try {
    const { email } = req.params;
    logger.info({
      message: `Remove email from newsletter ${email}`,
      label: LABEL,
    });

    const retrievedEmail = await Newsletter.find({ email });

    if (!retrievedEmail) {
      logger.error({ message: `Not Found email.`, label: LABEL });
      return res.status(404).send({ error: "Not Found email." });
    }

    await Newsletter.findOneAndUpdate({ email }, { isActive: false });
    return res.send({ message: "success." });
  } catch (error) {
    logger.error({ message: `${error}`, label: LABEL });
    return res.status(500).send({ error });
  }
};

const sendToAll = async (req, res, next) => {
  const msg = req.body;
  const { error, value: msgObj } = messageSchema.validate(msg);
  const isMultiRecipients = typeof msgObj.to === "object";

  if (isMultiRecipients) {
    msgObj.isMultiple = true;
  }

  if (error) {
    return res.status(400).send({ error: error.message });
  }

  try {
    await sendMessage(msgObj);
    return res.status(202).send({ message: "success" });
  } catch (error) {
    logger.error({ message: `${error}`, label: LABEL });
    return res.status(500).send({ error });
  }
};

module.exports = {
  getAllEmails,
  addNewEmail,
  removeEmail,
  sendToAll,
};
