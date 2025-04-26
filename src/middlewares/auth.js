const jwt = require("jsonwebtoken");
const User = require("../models/userModel"); 
const userAuth = async (req, res, next) => {
  // Read the token from the request cookies
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Token not found!!");
    }
     //validate the token
    const decodedObj = await jwt.verify(token, "AMIT@777$99");
    const { _id } = decodedObj; 

     //Find the username
    const user = await User.findById(_id);
    if (!user) {
      return res.status(401).send("User not found!!");
    }
    next(); // Call the next middleware or route handler
   
   
  } catch (err) {
    return res.status(400).send("Error" + err.message);
   
  }
};

module.exports = {
  userAuth,
};
