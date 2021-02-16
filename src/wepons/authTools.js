const UserModel = require("../services/schema");
const atob = require("atob");

const basicAuthMiddleware = async (req, res, next) => {
  if (!req.headers.authorization) {
    const error = new Error("Please provide your authorization idiot");
    error.httpStatusCode = 401;

    next(error);
  } else {
    const [username, password] = atob(
      req.headers.authorization.split(" ")[1]
    ).split(":");

    const user = await UserModel.findByCredentials(username, password);

    if (!user) {
      const error = new Error("WRONG CREDENTIALS DUUUUDE");
      error.httpStatusCode = 401;
      next(error);
    } else {
      req.user = user;
    }

    // console.log("---->", decode);
    next();
  }

  //   const user = await UserMode.findByCredentials();
};

const adminOnlyMiddleware = async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    const error = new Error("YOU ARE NOT THE ADMIN");
    error.httpStatusCode = 403;
    next(error);
  }
};

module.exports = {
  areYouAdmin: adminOnlyMiddleware,
  basic: basicAuthMiddleware,
};
