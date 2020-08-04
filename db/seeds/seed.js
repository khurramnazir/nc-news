const {
  topicData,
  articleData,
  commentData,
  userData,
} = require("../data/index.js");

const { formatDates, formatComments, makeRefObj } = require("../utils/utils");

exports.seed = function (knex) {
  const topicsInsertions = knex("topics").insert(topicData).returning("*");
  const usersInsertions = knex("users").insert(userData).returning("*");
  const articleInsertions = knex("articles")
    .insert(formatDates(articleData))
    .returning("*");

  return knex.migrate
    .rollback()
    .then(() => {
      return knex.migrate.latest();
    })
    .then(() => {
      console.log("lets seed");
    })
    .then(() => {
      return Promise.all([
        topicsInsertions,
        usersInsertions,
        articleInsertions,
      ]);
    })
    .then(([topics, users, articles]) => {
      const articleRef = makeRefObj(articles);
      const formattedComments = formatComments(commentData, articleRef);
      return knex("comments").insert(formattedComments);
    });
};
