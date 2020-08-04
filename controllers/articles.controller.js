const { fetchArticle } = require("../models/articles.models");

exports.getArticle = (req, res, next) => {
  fetchArticle(req.params.article_id)
    .then((article) => {
      res.status(200);
      res.send({ article });
    })
    .catch((err) => {
      next(err);
    });
};
