const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
      const user = req.user; //This will give you the user object from the middleware
  
      res.send(user);
    } catch (err) {
      res.status(400).send("Something went wrong!!" + err.message);
    }
  });
  
module.exports = profileRouter;