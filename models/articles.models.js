const knex = require("../db/connection");

exports.fetchAllArticles = (
  sort_by = "created_at",
  order = "desc",
  author,
  topic
) => {
  // const checkAuthorExists = knex
  //   .select("username")
  //   .from("users")
  //   .where("username", author)
  //   .then((chosenAuthor) => {
  //     return chosenAuthor;
  //   });
  // const checkTopicExists = knex
  //   .select("slug")
  //   .from("topics")
  //   .where("slug", topic)
  //   .then((chosenTopic) => {
  //     return chosenTopic;
  //   });

  if (author && topic) {
    const checkAuthorExists = knex
      .select("username")
      .from("users")
      .where("username", author)
      .then((chosenAuthor) => {
        return chosenAuthor;
      });
    const checkTopicExists = knex
      .select("slug")
      .from("topics")
      .where("slug", topic)
      .then((chosenTopic) => {
        return chosenTopic;
      });
    return Promise.all([checkAuthorExists, checkTopicExists]).then(
      ([author, topic]) => {
        if (author.length === 0) {
          return Promise.reject({
            status: 404,
            msg: "author does not exist",
          });
        } else if (topic.length === 0) {
          return Promise.reject({
            status: 404,
            msg: "topic does not exist",
          });
        } else {
          return knex
            .select("articles.*")
            .from("articles")
            .leftJoin("comments", "articles.article_id", "comments.article_id")
            .groupBy("articles.article_id")
            .count("comments.article_id", { as: "comment_count" })
            .orderBy(sort_by, order)
            .modify((query) => {
              if (author) query.where("articles.author", author);
              if (topic) query.where("articles.topic", topic);
            });
        }
      }
    );
  } else if (author) {
    const checkAuthorExists = knex
      .select("username")
      .from("users")
      .where("username", author)
      .then((chosenAuthor) => {
        return chosenAuthor;
      });
    return Promise.all([checkAuthorExists]).then(([author]) => {
      if (author.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "author does not exist",
        });
      } else {
        return knex
          .select("articles.*")
          .from("articles")
          .leftJoin("comments", "articles.article_id", "comments.article_id")
          .groupBy("articles.article_id")
          .count("comments.article_id", { as: "comment_count" })
          .orderBy(sort_by, order)
          .modify((query) => {
            if (author) query.where("articles.author", author);
            if (topic) query.where("articles.topic", topic);
          });
      }
    });
  } else if (topic) {
    const checkTopicExists = knex
      .select("slug")
      .from("topics")
      .where("slug", topic)
      .then((chosenTopic) => {
        return chosenTopic;
      });
    return Promise.all([checkTopicExists]).then(([topic]) => {
      if (topic.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "topic does not exist",
        });
      } else {
        return knex
          .select("articles.*")
          .from("articles")
          .leftJoin("comments", "articles.article_id", "comments.article_id")
          .groupBy("articles.article_id")
          .count("comments.article_id", { as: "comment_count" })
          .orderBy(sort_by, order)
          .modify((query) => {
            if (author) query.where("articles.author", author);
            if (topic) query.where("articles.topic", topic);
          });
      }
    });
  } else {
    return knex
      .select("articles.*")
      .from("articles")
      .leftJoin("comments", "articles.article_id", "comments.article_id")
      .groupBy("articles.article_id")
      .count("comments.article_id", { as: "comment_count" })
      .orderBy(sort_by, order)
      .modify((query) => {
        if (author) query.where("articles.author", author);
        if (topic) query.where("articles.topic", topic);
      });
  }
};

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
          msg: "Article id not found",
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
