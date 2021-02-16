const badRequestHandler = (err, req, res, next) => {
  if (err.httpStatusCode === 400) {
    res.status(400).send("YOU MADE A BAD REQ DUDE!!!");
  }
  next(err);
};
const unAuthorizedHandler = (err, req, res, next) => {
  if (err.httpStatusCode === 401) {
    res.status(401).send(err.message || "UNAUTHORIZED");
  }
  next(err);
};
const forbiddenHandler = (err, req, res, next) => {
  if (err.httpStatusCode === 403) {
    res.status(403).send(err.message || "Forbidden duuude");
  }
  next(err);
};
const notFoundHandler = (err, req, res, next) => {
  if (err.httpStatusCode === 404) {
    res.status(404).send(err.message || "NOT FOUND. ):");
  }
  next(err);
};
const genericErrorHandler = (err, req, res, next) => {
  if (err.httpStatusCode === 500) {
    res.status(500).send(err.message || "YABADABA GENERIC ERROR");
  }
  next(err);
};

module.exports = {
  genericErrorHandler,
  notFoundHandler,
  unAuthorizedHandler,
  forbiddenHandler,
  badRequestHandler,
};
