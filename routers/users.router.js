const usersRouter = require("express").Router();
const { getUser, getAllUsers } = require("../controllers/users.controller");
const { handle405error } = require("../errors");

usersRouter.route("/:username").get(getUser).all(handle405error);
usersRouter.route("/").get(getAllUsers).all(handle405error);

module.exports = usersRouter;
