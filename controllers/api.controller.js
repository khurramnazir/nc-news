const { fetchAllApiEndpoints } = require("../models/api.model");

exports.getApiEndpoints = (req, res, next) => {
  fetchAllApiEndpoints()
    .then((endpoints) => {
      console.log(endpoints);
      res.status(200);
      res.send({ endpoints });
    })
    .catch((err) => {
      next(err);
    });
};
