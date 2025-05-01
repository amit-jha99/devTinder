const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation"); //This function will validate the data coming from the client
// const User = require("../models/user"); //This will import the user model

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user; //This will give you the user object from the middleware

    res.send(user);
  } catch (err) {
    res.status(400).send("Something went wrong!!" + err.message);
  }
});

profileRouter.patch("/profile/edit/", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      return res.status(400).send("Invalid data!!"); //This will send a 400 status code if the data is not valid
    } //This function will throw an error if the data is not valid

    const loggedInUser = req.user;

    Object.keys(req.body).forEach(
      (keys) => (loggedInUser[keys] = req.body[keys])
    ); //This will update the user object with the new data coming from the client

    await loggedInUser.save(); //This will save the updated user object in the database
    res.send(
      `${loggedInUser.firstName} , your  profile updated successfully!!`
    ); //This will send a success message to the client
  } catch (err) {
    res.status(400).send("Something went wrong!!" + err.message);
  }
});
module.exports = profileRouter;
