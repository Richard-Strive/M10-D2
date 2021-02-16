const express = require("express");
const cors = require("cors");
const listEndpoints = require("express-list-endpoints");
const mongoose = require("mongoose");

const userRoute = require("./services/user");

const {
  badRequestHandler,
  forbiddenHandler,
  unAuthorizedHandler,
  genericErrorHandler,
  notFoundHandler,
} = require("./wepons/errorHandlers");

const server = express();
server.use(cors());
server.use(express.json());

const port = process.env.PORT || 8001;

server.use("/users", userRoute);

server.use(badRequestHandler);
server.use(forbiddenHandler);
server.use(unAuthorizedHandler);
server.use(genericErrorHandler);
server.use(notFoundHandler);

console.log(listEndpoints(server));

mongoose.set("debug", true); //idk what this line does

mongoose
  .connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(
    server.listen(port, () => {
      console.log("Hey it's running on port---->", port);
    })
  )
  .catch((err) => console.log(err));
