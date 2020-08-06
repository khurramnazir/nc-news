const usersRouter = require("express").Router();
const { getUser } = require("../controllers/users.controller");
const { handle405error } = require("../errors");

usersRouter.route("/:username").get(getUser).all(handle405error);

module.exports = usersRouter;
