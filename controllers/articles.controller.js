const {
  fetchArticle,
  addVotesToArticle,
} = require("../models/articles.models");

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

exports.patchArticle = (req, res, next) => {
  const article_id = req.params.article_id;
  const votes = req.body.inc_votes;
  addVotesToArticle(article_id, votes)
    .then((article) => {
      res.status(201);
      res.send({ article });
    })
    .catch((err) => {
      next(err);
    });
};
