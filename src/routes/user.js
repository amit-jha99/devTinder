const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const connectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

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
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA); //This will populate the fromUserId field with the firstName, lastName and photoUrl of the user

    const data = connections.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
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

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    // User should see all the user cards except
    //0. his own card
    //1. his connecitons
    //2. ignored people
    //3. already sent the connecion request

    const loggedInUser = req.user;
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;//default page is 1
    limit = limit > 50 ?50:limit;
    const skip = (page-1) * limit; //skip the first (page-1)*limit records
    //Find all connection requests(send+ received)

    const connectionRequests = await connectionRequest
      .find({
        $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
      }).select("fromUserId toUserId")

      const hideUsersFromFeed = new Set();
      connectionRequests.forEach((req)=>{
        hideUsersFromFeed.add(req.fromUserId.toString());
        hideUsersFromFeed.add(req.toUserId.toString());
      })
      

      const users = await User.find({
        $and : [{_id: {$nin:Array.from(hideUsersFromFeed)}},
          {_id:{$ne: loggedInUser._id}},
        ]
      }).select(USER_SAFE_DATA).skip(skip).limit(limit);
      
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong!!" + err.message);
  }
});
module.exports = userRouter;
