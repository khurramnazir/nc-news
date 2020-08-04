const { fetchTopics } = require("../models/topics.models");
const { response } = require("express");

exports.getTopics = (req, res) => {
  fetchTopics().then((topics) => {
    console.log(topics);
    res.status(200);
    res.send({ topics });
  });
};
