const { insertComment } = require("../models/comments.models");

exports.postComment = (req, res, next) => {
  console.log("in the controller");
  insertComment(req.params.article_id)
    .then((article) => {
      res.status(200);
      res.send({ article });
    })
    .catch((err) => {
      next(err);
    });
};
