const {
  fetchArticle,
  addVotesToArticle,
  fetchAllArticles,
} = require("../models/articles.models");

exports.getAllArticles = (req, res, next) => {
  const { sort_by, order, author, topic } = req.query;

  fetchAllArticles(sort_by, order, author, topic)
    .then((articles) => {
      res.status(200);
      res.send({ articles });
    })
    .catch((err) => {
      next(err);
    });
};

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
      res.status(200);
      res.send({ article });
    })
    .catch((err) => {
      next(err);
    });
};
