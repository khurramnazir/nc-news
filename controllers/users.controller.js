const { fetchUser } = require("../models/users.models");

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
