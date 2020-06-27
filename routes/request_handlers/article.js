const Article = require("../../models/article");
const Joi = require("@hapi/joi");

const articleSchema = Joi.object({
  title: Joi.string().required(),
  summary: Joi.string().max(140).required(),
  markdown: Joi.string().required(),
  createdAt: Joi.date().default(new Date()).required(),
  updatedAt: Joi.date().required(),
  author: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).max(5).unique().required(),
});

const getAllArticles = (req, res, next) => {};

const createNewArticle = async (req, res, next) => {
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
  console.log(id);
  const { deletedCount, ok } = await Article.deleteOne({ _id: id });
  console.log(ok, deletedCount);

  if (deletedCount === 0 && ok)
    return res.status(409).send({ error: "There's no article with this id!" });

  return res.status(200).send({ message: "The article deleted succesfully!" });
};

module.exports = {
  getAllArticles,
  createNewArticle,
  deleteArticleById,
};
