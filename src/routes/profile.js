const express = requrie("express");
const profileRouter = express.Router()


profileRouter.get("/profile", userAuth, async (req, res) => {
    try {
      const user = req.user; //This will give you the user object from the middleware
  
      res.send(user);
    } catch (err) {
      res.status(400).send("Something went wrong!!" + err.message);
    }
  });
  
module.exports = profileRouter;