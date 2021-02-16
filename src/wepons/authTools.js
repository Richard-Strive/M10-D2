const UserModel = require("../services/schema");
const atob = require("atob");

const adminOnlyMiddleware = async (req, res, next) => {
  if (req.user && req.user.role === admin) {
    next();
  } else {
    const error = new Error("YOU ARE NOT A ADMIN");
    error.httpStatusCode = 403;
    next(error);
  }
};

module.exports = { areYouAdmin: adminOnlyMiddleware };
