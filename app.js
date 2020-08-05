const express = require("express");
const apiRouter = require("./routers/api.router");
const { handleCustomError, handle500Error } = require("./errors/index");

const app = express();
app.use(express.json());

app.use("/api", apiRouter);

app.use(handleCustomError);
app.use(handle500Error);

module.exports = app;
