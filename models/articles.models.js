const knex = require("../db/connection");

// const allAuthors = knex
//   .select("username")
//   .from("users")
//   .then((authors) => {
//     const authorsArray = authors.map((author) => {
//       return author.username;
//     });
//     return authorsArray;
//   });

// const allTopics = knex
//   .select("slug")
//   .from("topics")
//   .then((topics) => {
//     const topicsArray = topics.map((topic) => {
//       return topic.slug;
//     });
//     return topicsArray;
//   });

// exports.fetchAllArticles = (
//   sort_by = "created_at",
//   order = "desc",
//   author = "%",
//   topic = "%"
// ) => {
//   return Promise.all([allAuthors, allTopics]).then(([authors, topics]) => {
//     if (
//       (authors.includes(author) && topics.includes(topic)) ||
//       (authors.includes(authors) && topics === "%") ||
//       (topics.includes(topics) && author === "%") ||
//       (author === "%" && topics === "%") ||
//       topic === "%" ||
//       author === "%"
//     ) {
//       return knex
//         .select("articles.*")
//         .from("articles")
//         .leftJoin("comments", "articles.article_id", "comments.article_id")
//         .groupBy("articles.article_id")
//         .count("comments.article_id", { as: "comment_count" })
//         .orderBy(sort_by, order)
//         .modify((query) => {
//           if (author) query.where("articles.author", "like", author);
//           if (topic) query.where("articles.topic", "like", topic);
//         });
//     } else {
//       return Promise.reject({
//         status: 404,
//         msg: "Invalid name or topic",
//       });
//     }
//   });
// };

exports.fetchAllArticles = (
  sort_by = "created_at",
  order = "desc",
  author,
  topic
) => {
  if (
    (author !== undefined && topic !== undefined) ||
    author !== undefined ||
    topic !== undefined
  ) {
    const checkAuthorExists = knex
      .select("username")
      .from("users")
      .where("username", author)
      .then((author) => {
        return author;
      });
    const checkTopicExists = knex
      .select("slug")
      .from("topics")
      .where("slug", "=", topic)
      .then((topic) => {
        return topic;
      });
    return Promise.all([checkAuthorExists, checkTopicExists]).then(
      ([author, topic]) => {
        if (author.length === 0) {
          return Promise.reject({
            status: 404,
            msg: "username does not exist",
          });
        } else if (topic.length === 0) {
          return Promise.reject({
            status: 404,
            msg: "topic does not exist",
          });
        }
      }
    );
  } else {
    return knex
      .select("articles.*")
      .from("articles")
      .leftJoin("comments", "articles.article_id", "comments.article_id")
      .groupBy("articles.article_id")
      .count("comments.article_id", { as: "comment_count" })
      .orderBy(sort_by, order)
      .modify((query) => {
        if (author) query.where("articles.author", "=", author);
        if (topic) query.where("articles.topic", "=", topic);
      });
  }

  // .then(() => {

  // });

  // else {
  //   return knex
  //     .select("articles.*")
  //     .from("articles")
  //     .leftJoin("comments", "articles.article_id", "comments.article_id")
  //     .groupBy("articles.article_id")
  //     .count("comments.article_id", { as: "comment_count" })
  //     .orderBy(sort_by, order)
  //     .modify((query) => {
  //       if (author) query.where("articles.author", "=", author);
  //       if (topic) query.where("articles.topic", "=", topic);
  //     });
  // }
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
