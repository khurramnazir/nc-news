const handle400error = (err, req, res, next) => {
  if (err.code === "23502") {
    res.status(400).send({ msg: "Bad request" });
  } else next(err);
};

const handle404error = (err, req, res, next) => {
  if ("status" in err) {
    res.status(err.status).send({ msg: err.msg });
  } else if (err.code === "22P02") {
    res.status(404).send({ msg: "Invalid id" });
  } else next(err);
};

module.exports = { handle400error, handle404error };
