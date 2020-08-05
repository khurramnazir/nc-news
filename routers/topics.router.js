const topicsRouter = require("express").Router();
const { getTopics } = require("../controllers/topics.controller");
const { handle405error } = require("../errors");

topicsRouter.route("/").get(getTopics).all(handle405error);

module.exports = topicsRouter;
