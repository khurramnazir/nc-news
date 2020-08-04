const knex = require("../db/connection");

exports.article = (article_id) => {
  return knex
    .select("*")
    .from("articles")
    .where("article_id", article_id)
    .then((result) => {
      if (result.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Invalid id",
        });
      } else return result;
    });
};
