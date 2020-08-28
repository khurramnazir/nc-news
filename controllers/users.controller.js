const { fetchUser, fetchAllUsers } = require("../models/users.models");

exports.getAllUsers = (req, res, next) => {
  fetchAllUsers()
    .then((users) => {
      res.status(200);
      res.send({ users });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getUser = (req, res, next) => {
  fetchUser(req.params.username)
    .then((user) => {
      res.status(200);
      res.send({ user });
    })
    .catch((err) => {
      next(err);
    });
};
