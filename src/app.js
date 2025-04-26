const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bycrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  //validate the data coming from the client
  try {
    validateSignUpData(req); //This function will throw an error if the data is not valid

    const { firstName, lastName, emailId, password } = req.body; //Destructuring the password from the request body
    //Encrypt the password
    const passwordHash = await bycrypt.hash(password, 10); //10 is the number of rounds for hashing the password

    console.log(passwordHash); //This will give you the hashed password

    //Creating a new instance of the User model
    // const user = new User(req.body);

    //this is the good pratice to create a new instance of the model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash, //Storing the hashed password in the database
    });

    await user.save(); //This function returns you a  promise infact most of the mongoose function return you a promise
    res.send("User Added succesfully!");
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
  }
});

//Login API - POST/login - login the user
app.post("/login", async (req, res) => {
  const { emailId, password } = req.body;
  try {
    const user = await User.findOne({ emailId });
    if (!user) {
      return res.status(404).send("User not found!!");
    }
    const isPasswordMatch = await user.validatePassword(password); //This function will return you a boolean value

    if (isPasswordMatch) {
      //here I will write the logic of cookie

      // create a JWT token
      const token = await  user.getJWT(); //This function will return you a token
      console.log(token); //This will give you the token

      // Add the token to cookie and send the response back to the user
      res.cookie("token", token,{expires: new Date(Date.now() + 900000)});
      res.send("Login successfull!!");
    } else {
      return res.status(401).send("Invalid credentials!!");
    }
  } catch (err) {
    res.status(400).send("Something went wrong!!" + err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user; //This will give you the user object from the middleware

    res.send(user);
  } catch (err) {
    res.status(400).send("Something went wrong!!" + err.message);
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  console.log("Connection request sent!!");
  res.send(
    user.firstName + " " + user.lastName + " sent you a connection request!!"
  );
});

connectDB()
  .then(() => {
    console.log("Database connection established.....");

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!!");
  });
