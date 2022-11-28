const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");
const isAdmin = (req, res, next) => {
  if (req.user && req.user.admin) {
    next();
  } else {
    throw new UnauthenticatedError("not authorized");
  }
};

module.exports = isAdmin;
