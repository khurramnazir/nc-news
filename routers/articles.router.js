const articlesRouter = require("express").Router();
const commentsRouter = require("./comments.router");
const {
  getArticle,
  patchArticle,
} = require("../controllers/articles.controller");

articlesRouter.route("/:article_id").get(getArticle).patch(patchArticle);

articlesRouter.use("/:article_id/comments", commentsRouter);

module.exports = articlesRouter;
