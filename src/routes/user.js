const express = require('express');
const userRouter = express.Router();
const { userAuth } = require('../middlewares/auth');
const connectionRequest = require('../models/connectionRequest');

//get all the pending connection request for the logged in user
userRouter.get('/user/requests/received', userAuth,async(req,res)=>{
    try{
        const loggedInUser = req.user;
        const connectionRequests = await connectionRequest.find({
            toUserId: loggedInUser._id,
            status:"interested",
        })
        res.json({
            message: "All the connection requests",
            data: connectionRequests,
        });

    }catch(err){
        res.status(400).send("Something went wrong!!" + err.message);
    }

});
module.exports = userRouter;