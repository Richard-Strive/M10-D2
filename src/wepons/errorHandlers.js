const badRequestHandler = (err, req, res, next) => {
  if (err.httpStatusCode === 400) {
    res.status(400).send(err.message || "YOU MADE A BAD REQ DUDE!!!");
  }
};
const unAuthorizedHandler = (err, req, res, next) => {
  if (err.httpStatusCode === 401) {
    res.status(401).send(err.message || "UNAUTHORIZED");
  }
};
const forbiddenHandler = (err, req, res, next) => {
  if (err.httpStatusCode === 403) {
    res.status(403).send(err.message || "Forbidden duuude");
  }
};
const notFoundHandler = (err, req, res, next) => {
  if (err.httpStatusCode === 404) {
    res.status(404).send(err.message || "NOT FOUND. ):");
  }
};
const genericErrorHandler = (err, req, res, next) => {
  if (err.httpStatusCode === 500) {
    res.status(500).send(err.message || "YABADABA GENERIC ERROR");
  }
};

module.exports = {
  genericErrorHandler,
  notFoundHandler,
  unAuthorizedHandler,
  forbiddenHandler,
  badRequestHandler,
};
