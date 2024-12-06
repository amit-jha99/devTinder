const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");


app.post("/signup",async(req,res)=>{
  const userObj = {
    firstName : "M.S.",
    lastName : "Dhoni",
    emailId : "Dhoni07@gmail.com",
    password : "Mahi"
  }

  //Creating a new instance of the User model
  const user = new User(userObj);
  try{
    await user.save();//This function returns you a  promise infact most of the mongoose function return you a promise
    res.send("User Added succesfully!");

  }catch(err){
    res.status(400).send("Error saving the user:" + err.message);
  }

  
})

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
