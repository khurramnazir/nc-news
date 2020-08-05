const commentsRouter = require("express").Router();

const { postComment } = require("../controllers/comments.controller");

commentsRouter.route("/").post(postComment);

module.exports = commentsRouter;
