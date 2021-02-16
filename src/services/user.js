const express = require("express");
const { areYouAdmin } = require("../wepons/authTools");
const UserModel = require("./schema");

userRoute = express.Router();

userRoute.post("/Register", async (req, res, next) => {
  try {
    const newUser = new UserModel(req.body);

    const { _id } = await newUser.save();
    res.status(200).send(_id);
  } catch (error) {
    console.log(error);
  }
});

userRoute.get("/", areYouAdmin, async (req, res, next) => {
  try {
    const allUsers = await UserModel.find();

    res.status(200).send(allUsers);
  } catch (error) {
    console.log(error);
  }
});

module.exports = userRoute;
