const knex = require("../db/connection");

exports.insertComment = (article_id) => {
  console.log("in the model");
  return knex
    .select("*")
    .from("comments")
    .where("articles.article_id", article_id)
    .then((result) => {
      console.log(result);
      if (result.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Invalid id",
        });
      } else return result;
    });
};
