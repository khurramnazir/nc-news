exports.up = function (knex) {
  return knex.schema.createTable("users", (usersTable) => {
    console.log("creating users table");
    usersTable.string("username").primary().notNullable();
    usersTable.string("avatar_url", 999999).notNullable();
    usersTable.string("name").notNullable();
  });
};

exports.down = function (knex) {
  console.log("dropping users table");
  return knex.schema.dropTable("users");
};
