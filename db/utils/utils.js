const knex = require("knex");
exports.formatDates = (list) => {
  const articleCorrectDate = list.map(function (article) {
    const articleCopy = { ...article };
    const dateObj = new Date(articleCopy.created_at);
    articleCopy.created_at = dateObj;
    return articleCopy;
  });

  return articleCorrectDate;
};

exports.makeRefObj = (list) => {
  let refObj = {};

  list.forEach((obj) => {
    const owner_id = owner.owner_id;
    const forename = owner.forename;

    lookup[forename] = owner_id;
  });
};

exports.formatComments = (comments, articleRef) => {};
