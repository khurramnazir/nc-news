const knex = require("../db/connection");

exports.fetchArticle = (article_id) => {
  return (
    knex
      .select("articles*")
      .from("articles")
      .where("article_id", article_id)
      // .join("comments", "comments.article_id", "=", "articles.article_id")
      .count("articles.article_id", { as: "comment_count" })
      .then((result) => {
        console.log(result);
        if (result.length === 0) {
          return Promise.reject({
            status: 404,
            msg: "Invalid id",
          });
        } else return result;
      })
  );
};
