const express = require("express");
const apiRouter = require("./routers/api.router");
const { handle400error, handle404error } = require("./errors/index");

const app = express();
app.use(express.json());

app.use("/api", apiRouter);

app.use(handle400error);
app.use(handle404error);

module.exports = app;
