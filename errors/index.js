// Error Handling
const handleCustomError = (err, req, res, next) => {
  if ("status" in err) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
};

const handle400Error = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Invalid id" });
  } else if (err.code === "42703") {
    res.status(400).send({ msg: "Invalid sort by column" });
  } else next(err);
};

const handle404Error = (err, req, res, next) => {
  if (err.code === "23503") {
    res.status(404).send({ msg: "id not found" });
  } else next(err);
};

const handle500Error = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "internal server error" });
};

// Controller
const handle405error = (req, res, next) => {
  res.status(405).send({ msg: "method not allowed" });
};

module.exports = {
  handle405error,
  handleCustomError,
  handle500Error,
  handle400Error,
  handle404Error,
};
