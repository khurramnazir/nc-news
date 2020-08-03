exports.up = function (knex) {
  return knex.schema.createTable("comments", (commentsTable) => {
    console.log("creating comments table");
    commentsTable.increments("comment_id");
    commentsTable.string("author").references("users.username").notNullable();
    commentsTable
      .integer("article_id")
      .references("articles.article_id")
      .notNullable();
    commentsTable.integer("votes").defaultTo(0);
    commentsTable.timestamp("created_at").defaultTo(knex.fn.now());
    commentsTable.text("body").notNullable();
  });
};

exports.down = function (knex) {
  console.log("dropping comments table");
  return knex.schema.dropTable("comments");
};
