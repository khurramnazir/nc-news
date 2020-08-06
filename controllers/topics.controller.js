const { fetchTopics } = require("../models/topics.models");
const { response } = require("express");

exports.getTopics = (req, res, next) => {
  fetchTopics()
    .then((topics) => {
      res.status(200);
      res.send({ topics });
    })
    .catch(next);
};
