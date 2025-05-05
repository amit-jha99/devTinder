const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const connectionRequest = require("../models/connectionRequest");

const USER_SAFE_DATA = "firstName lastName photoUrl age";

//get all the pending connection request for the logged in user
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await connectionRequest
      .find({
        toUserId: loggedInUser._id,
        status: "interested",
      })
      .populate("fromUserId", [
        "firstName",
        "lastName",
        "photoUrl",
        "age",
        "gender",
      ]); //This will populate the fromUserId field with the firstName, lastName and photoUrl of the user
    res.json({
      message: "All the connection requests",
      data: connectionRequests,
    });
  } catch (err) {
    res.status(400).send("Something went wrong!!" + err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connections = await connectionRequest
      .find({ 
        $or: [
          {
            fromUserId: loggedInUser._id,
            status: "accepted",
          },
          { 
            toUserId: loggedInUser._id,
            status: "accepted",
          },
        ],
      })
      .populate("fromUserId", USER_SAFE_DATA).populate("toUserId", USER_SAFE_DATA); //This will populate the fromUserId field with the firstName, lastName and photoUrl of the user

    const data = connections.map((row) => {
        if(row.fromUserId._id.toString()===loggedInUser._id.toString()){
           return  row.toUserId ;
        }
        return row.fromUserId;
    });
    res.json({
      message: "All the connections",
      data: data,
    });
  } catch (err) {
    res.status(400).send("Something went wrong!!" + err.message);
  }
});

userRouter.get("/user/feed",userAuth,async (req,res)=>{
    try{

    }catch(err){
        res.status(400).send("Something went wrong!!" + err.message);
    }
})
module.exports = userRouter;
