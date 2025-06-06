const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id; //This will give you the user object from the middleware
      const toUserId = req.params.toUserId; //This will give you the user object from the middleware
      const status = req.params.status; //This will give you the user object from the middleware

      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          message: "Invalid status type!!" + status,
        });
      }

      const toUser = await User.findById(toUserId); //This will give you the user object from the database
      if (!toUser) {
        return res.status(404).json({
          message: "User not found!!",
        });
      }

      //If there is an existing connection request
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          {
            fromUserId,
            toUserId,
          },
          {
            fromUserId: toUserId,
            toUserId: fromUserId,
          },
        ],
      });
      if (existingConnectionRequest) {
        return res.status(400).json({
          message: "Connection request already sent!!",
        });
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      const data = await connectionRequest.save(); //This will save the updated user object in the database
      const message =
        status === "interested"
          ? `${req.user.firstName} ${req.user.lastName} is interested in connecting with ${toUser.firstName} ${toUser.lastName}!`
          : `${req.user.firstName} ${req.user.lastName} has ignored ${toUser.firstName} ${toUser.lastName} connection request.`;

      res.json({
        message: message,
        data: data,
      });
    } catch (err) {
      res.status(400).send("Something went wrong!!" + err.message);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user; //This will give you the user object from the middleware
      const{status,requestId} = req.params; //This will give you the user object from the middleware
       // Validate the status 
      const allowedStatus = ["accepted", "rejected"];
      if(!allowedStatus.includes(status)){
        return res.status(400).json({
          message:"Invalid status type!!" + req.params.status,
        })
      }

      //checking connection request is already present or not 
      const connectionRequest = await ConnectionRequest.findOne({
        _id:requestId,
        toUserId:loggedInUser._id,
        status:"interested",
      })
      if(!connectionRequest){
        return res.status(404).json({
          message:"Connection request not found!!",
        })
      }

      connectionRequest.status = status; //This will update the user object with the new data coming from the client
      const data = await connectionRequest.save(); //This will save the updated user object in the database
      res.status(200).json({
        message: `Connection request ${status} successfully!`,
        data: data,
      });

     

     
    } catch (err) {
      res.status(400).send("Something went wrong!!" + err.message);
    }
  }
);

module.exports = requestRouter;
