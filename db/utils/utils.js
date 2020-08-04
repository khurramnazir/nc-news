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

exports.makeRefObj = (articles) => {
  let lookup = {};

  articles.forEach((article) => {
    const article_id = article.article_id;
    const title = article.title;

    lookup[title] = article_id;
  });

  return lookup;
};

exports.formatComments = (comments, articleRef) => {
  const formattedComments = comments.map(function (comment) {
    const commentCopy = { ...comment };
    // insert artcle_id
    const articleId = articleRef[commentCopy.belongs_to];
    commentCopy.article_id = articleId;
    delete commentCopy.belongs_to;
    //insert author
    const authorName = commentCopy.created_by;
    commentCopy.author = authorName;
    delete commentCopy.created_by;
    // format timestamp
    const formattedTimeStamp = new Date(commentCopy.created_at);
    commentCopy.created_at = formattedTimeStamp;

    return commentCopy;
  });

  return formattedComments;
};
