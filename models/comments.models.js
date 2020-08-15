const knex = require("../db/connection");
const { all } = require("../app");

const allAuthors = knex
  .select("username")
  .from("users")
  .then((authors) => {
    const authorsArray = authors.map((author) => {
      return author.username;
    });
    return authorsArray;
  });

const allArticleIds = knex
  .select("article_id")
  .from("articles")
  .then((articles) => {
    const articleIdArray = articles.map((article) => {
      return article.article_id;
    });
    return articleIdArray;
  });

exports.insertComment = (articleId, username, body) => {
  if (username === undefined || body === undefined) {
    return Promise.reject({
      status: 400,
      msg: "username AND body required",
    });
  } else {
    return Promise.all([allAuthors, allArticleIds]).then(
      ([authors, articleIds]) => {
        if (/\d+/.test(articleId) === false) {
          return Promise.reject({
            status: 400,
            msg: "Invalid id",
          });
        } else if (
          authors.includes(username) &&
          articleIds.includes(parseInt(articleId))
        ) {
          return knex("comments")
            .insert([{ author: username, article_id: articleId, body: body }])
            .returning("*")
            .then((result) => {
              return result[0];
            });
        } else if (!authors.includes(username)) {
          return Promise.reject({
            status: 404,
            msg: "username does not exist",
          });
        } else if (!articleIds.includes(articleId)) {
          return Promise.reject({
            status: 404,
            msg: "article id does not exist",
          });
        }
      }
    );
  }
};

exports.fetchCommentsByArticleId = (
  articleId,
  order = "desc",
  sort_by = "created_at"
) => {
  const checkArticleIdExists = knex
    .select("article_id")
    .from("articles")
    .where("article_id", articleId)
    .then((chosenArticleId) => {
      return chosenArticleId;
    });
  return Promise.all([checkArticleIdExists]).then(([chosenArticleId]) => {
    if (chosenArticleId.length === 0) {
      return Promise.reject({
        status: 404,
        msg: "article id does not exist",
      });
    } else {
      return knex
        .select("*")
        .from("comments")
        .where("article_id", articleId)
        .orderBy(sort_by, order)
        .then((result) => {
          return result;
        });
    }
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
      } else return result[0];
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
