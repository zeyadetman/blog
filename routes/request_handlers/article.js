const Article = require("../../models/article");
const Joi = require("@hapi/joi");
const logger = require("../../utils/logger");
const LABEL = "Article";

const articleSchema = Joi.object({
  title: Joi.string().required(),
  summary: Joi.string().max(140).required(),
  markdown: Joi.string().required(),
  createdAt: Joi.date().default(new Date()).required(),
  updatedAt: Joi.date().required(),
  author: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).max(5).unique().required(),
});

const getAllArticles = async (req, res, next) => {
  try {
    const { limit = 10, skip = 0 } = req.query;
    logger.info({
      message: `Get Articles with limit ${limit}, and skip ${skip}`,
      label: LABEL,
    });
    const dataCount = await Article.countDocuments();
    const articles = await Article.find({}, null, {
      limit: Number(limit),
      skip: Number(skip),
    });
    return res.send({ count: dataCount, articles });
  } catch (error) {
    logger.error({ message: `${error.message}`, label: LABEL });
    next(error);
  }
};

const createNewArticle = async (req, res, next) => {
  logger.info({ message: `Create a new Article`, label: LABEL });

  const { title, markdown, author, tags } = req.body;
  const userArticle = {
    title,
    summary: markdown,
    markdown,
    createdAt: new Date(),
    updatedAt: new Date(),
    author,
    tags,
  };

  const { error, value } = articleSchema.validate(userArticle);

  if (error) {
    return res.status(422).send({ error });
  }

  const newArticle = new Article(value);
  const article = await newArticle.save();
  return res.send({ article });
};

const deleteArticleById = async (req, res, next) => {
  const { id } = req.params;
  logger.info({ message: `Delete Article for id ${id}`, label: LABEL });
  const { deletedCount, ok } = await Article.deleteOne({ _id: id });

  if (deletedCount === 0 && ok)
    return res.status(409).send({ error: "There's no article with this id!" });

  return res.status(200).send({ message: "The article deleted succesfully!" });
};

const getArticle = async (req, res, next) => {
  try {
    const { id } = req.params;
    logger.info({ message: `Get Article for id ${id}`, label: LABEL });
    const article = await Article.findById(id);
    if (article) {
      return res.send({ article });
    } else {
      return res.status(404).send({ error: "Not Found!" });
    }
  } catch (error) {
    logger.error({ message: `${error.message}`, label: LABEL });
    next(error);
  }
};

const updateArticle = async (req, res, next) => {
  try {
    const { id } = req.params;
    logger.info({ message: `Update Article for id ${id}`, label: LABEL });

    const body = req.body;
    const updateObj = {
      updatedAt: new Date(),
      title: body.title,
      markdown: body.markdown,
      tags: body.tags,
      summary: body.summary,
      markdown: body.markdown,
      author: body.author,
    };

    for (let prop in updateObj) if (!updateObj[prop]) delete updateObj[prop];
    const article = await Article.findByIdAndUpdate(id, updateObj, {
      new: true,
      useFindAndModify: false,
    });

    if (article) return res.send({ article });
    else return res.status(404).send({ error: "Not Found" });
  } catch (error) {
    logger.error({ message: `${error.message}`, label: LABEL });
    next(error);
  }
};

module.exports = {
  getArticle,
  getAllArticles,
  createNewArticle,
  deleteArticleById,
  updateArticle,
};
