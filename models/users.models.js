const knex = require("../db/connection");

exports.fetchAllUsers = () => {
  return knex.select("*").from("users");
};

exports.fetchUser = (username) => {
  return knex
    .select("*")
    .from("users")
    .where("username", username)
    .then((result) => {
      if (result.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Invalid username",
        });
      } else return result[0];
    });
};
