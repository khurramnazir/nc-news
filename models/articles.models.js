const knex = require("../db/connection");

exports.fetchArticle = (article_id) => {
  return knex
    .select("articles.*")
    .from("articles")
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .count("comments.article_id", { as: "comment_count" })
    .where("articles.article_id", article_id)
    .then((result) => {
      if (result.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Invalid id",
        });
      } else return result;
    });
};

exports.addVotesToArticle = (article_id, votes) => {
  return knex
    .select("articles.*")
    .from("articles")
    .where("articles.article_id", article_id)
    .increment("votes", votes)
    .then((result) => {
      if (result === 0) {
        return Promise.reject({
          status: 404,
          msg: "Invalid id",
        });
      } else return exports.fetchArticle(article_id);
    });
};
