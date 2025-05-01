const express = require("express");
const connectDB = require("./config/database");
const app = express();

const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use ("/", authRouter); //This will use the authRouter for all the routes starting with /
app.use ("/", profileRouter); //This will use the profileRouter for all the routes starting with /  
app.use ("/", requestRouter); //This will use the requestRouter for all the routes starting with /

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
