const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    
   try {
      const fromUserId = req.user._id; //This will give you the user object from the middleware
      const toUserId = req.params.toUserId; //This will give you the user object from the middleware
      const status = req.params.status; //This will give you the user object from the middleware

      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          message: "Invalid status type!!" + status
        }); 
      } 
      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status
      });
      const data = await connectionRequest.save(); //This will save the updated user object in the database
      res.json({
        message: `${req.user.firstName} ${req.user.lastName} sent you a connection request!!`,
        data: data,
      })
   }
   catch(err) {
        res.status(400).send("Something went wrong!!" + err.message);
   }
    
  });
  
module.exports = requestRouter;