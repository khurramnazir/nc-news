// const { fetchAllApiEndpoints } = require("../models/api.model");

exports.getApiEndpoints = (req, res, next) => {
  fetchAllApiEndpoints((error, endpoints) => {
    if (error) next(error);
    else response.send({ endpoints });
  });
};
