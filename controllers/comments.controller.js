const {
  insertComment,
  fetchCommentsByArticleId,
  updateComment,
  delComment,
  fetchAllComments,
} = require("../models/comments.models");

exports.postComment = (req, res, next) => {
  const articleId = req.params.article_id;
  const username = req.body.username;
  const body = req.body.body;
  insertComment(articleId, username, body)
    .then((comment) => {
      res.status(201);
      res.send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getCommentsByArticleId = (req, res, next) => {
  const articleId = req.params.article_id;
  const order = req.query.order;
  const sort_by = req.query.sort_by;
  fetchCommentsByArticleId(articleId, order, sort_by)
    .then((comments) => {
      res.status(200);
      res.send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchComment = (req, res, next) => {
  const commentId = req.params.comment_id;
  const votes = req.body.inc_votes;
  updateComment(commentId, votes)
    .then((comment) => {
      res.status(201);
      res.send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteComment = (req, res, next) => {
  const commentId = req.params.comment_id;
  delComment(commentId)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      next(err);
    });
};

exports.getAllComments = (req, res, next) => {
  fetchAllComments()
    .then((comments) => {
      res.status(200);
      res.send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};
