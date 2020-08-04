const { fetchArticle } = require("../models/users.models");

exports.getUser = (req, res, next) => {
  fetchArticle(req.params.article_id)
    .then((user) => {
      res.status(200);
      res.send({ user });
    })
    .catch((err) => {
      next(err);
    });
};
