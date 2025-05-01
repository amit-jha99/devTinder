const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());



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
