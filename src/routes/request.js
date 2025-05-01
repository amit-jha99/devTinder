const express = require("express");
const requestRouter = express.Router();


requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
    const user = req.user;
    console.log("Connection request sent!!");
    res.send(
      user.firstName + " " + user.lastName + " sent you a connection request!!"
    );
  });
  
module.exports = requestRouter;