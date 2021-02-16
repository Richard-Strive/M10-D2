const express = require("express");
const { areYouAdmin, basic } = require("../wepons/authTools");
const UserModel = require("./schema");

userRoute = express.Router();

userRoute.post("/Register", async (req, res, next) => {
  try {
    const newUser = new UserModel(req.body);

    const { _id } = await newUser.save();
    res.status(200).send(_id);
  } catch (error) {
    console.log(error);

    next(error);
  }
});

userRoute.get("/", basic, areYouAdmin, async (req, res, next) => {
  try {
    const allUsers = await UserModel.find();

    res.send(allUsers);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

userRoute.get("/me", basic, async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

userRoute.put("/me", basic, async (req, res, next) => {
  try {
    const updates = Object.keys(req.body);
    console.log("--I'm the update-->", updates);

    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();

    res.send(req.user);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

userRoute.delete("/me", basic, async (req, res, next) => {
  try {
    await req.user.deleteOne();
    res.status(200).send("deleted");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = userRoute;
