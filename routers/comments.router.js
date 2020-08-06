const commentsRouter = require("express").Router();

const {
  patchComment,
  deleteComment,
  getAllComments,
} = require("../controllers/comments.controller");
const { handle405error } = require("../errors");

commentsRouter
  .route("/:comment_id")
  .patch(patchComment)
  .delete(deleteComment)
  .all(handle405error);

commentsRouter.route("/").get(getAllComments).all(handle405error);

module.exports = commentsRouter;
