// const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const auth = async (req, res, next) => {
  //check header

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authentication invalid");
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //attach user to the job route

    req.user = {
      userId: decoded.userId,
      fullname: decoded.fullname,
      
    };
    next();
  } catch (error) {
    throw new UnauthenticatedError("not authorized");
  }
};

module.exports = auth;
