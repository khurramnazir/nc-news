const express = require("express");
const apiRouter = require("./routers/api.router");
const {
  handleCustomError,
  handle500Error,
  handle400Error,
  handle404Error,
} = require("./errors/index");

const app = express();
app.use(express.json());

app.use("/api", apiRouter);

app.use(handleCustomError);
app.use(handle400Error);
app.use(handle404Error);
app.use(handle500Error);

app.all("*", (req, res, next) => {
  res.status(404).send({ msg: "Path does not exist" });
});

module.exports = app;
