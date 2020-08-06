const articlesRouter = require("express").Router();
const {
  getArticle,
  patchArticle,
  getAllArticles,
} = require("../controllers/articles.controller");
const {
  postComment,
  getCommentsByArticleId,
} = require("../controllers/comments.controller");
const { handle405error } = require("../errors");

articlesRouter.route("/").get(getAllArticles).all(handle405error);
articlesRouter
  .route("/:article_id")
  .get(getArticle)
  .patch(patchArticle)
  .all(handle405error);

articlesRouter
  .route("/:article_id/comments")
  .post(postComment)
  .get(getCommentsByArticleId)
  .all(handle405error);

module.exports = articlesRouter;
