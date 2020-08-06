const knex = require("../db/connection");

exports.insertComment = (articleId, username, body) => {
  return knex("comments")
    .insert([{ author: username, article_id: articleId, body: body }])
    .returning("*")
    .then((result) => {
      if (result.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Invalid id",
        });
      } else return result;
    });
};

exports.fetchCommentsByArticleId = (
  articleId,
  order = "desc",
  sort_by = "created_at"
) => {
  return knex
    .select("*")
    .from("comments")
    .where("article_id", articleId)
    .orderBy(sort_by, order)
    .then((result) => {
      if (result.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Article id not found",
        });
      } else return result;
    });
};

exports.updateComment = (commentId, votes) => {
  return knex
    .select("*")
    .from("comments")
    .where("comment_id", commentId)
    .increment("votes", votes)
    .returning("*")
    .then((result) => {
      if (result.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "comment id not found",
        });
      } else return result;
    });
};

exports.delComment = (commentId) => {
  return knex
    .select("*")
    .from("comments")
    .where("comment_id", commentId)
    .del()
    .then((deleteCount) => {
      if (deleteCount === 0) {
        return Promise.reject({
          status: 404,
          msg: "Invalid id",
        });
      }
    });
};

exports.fetchAllComments = () => {
  return knex
    .select("*")
    .from("comments")
    .then((result) => {
      if (result.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Invalid id",
        });
      } else return result;
    });
};
