const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
app.use(express.json());


app.post("/signup",async(req,res)=>{

  console.log(req.body);
  

  //Creating a new instance of the User model
  const user = new User(req.body);
  try{
    await user.save();//This function returns you a  promise infact most of the mongoose function return you a promise
    res.send("User Added succesfully!");

  }catch(err){
    res.status(400).send("Error saving the user:" + err.message);
  }

  
});


//Get user by email
app.get("/user",async (req,res)=>{
  const userEmail = req.body.emailId;

  try{
    const user = await User.findOne({emailId: userEmail});
    if(!user){
      res.status(404).send("User not found!!");
    }
    res.send(user);
    // const users = await User.find({emailId: userEmail});
    // if(users.length === 0){
    //   res.status(404).send("User not found !!");
    // }
    // res.send(users);

  }
  catch(err){
    res.status(400).send("Something went wrong!!!")
  }
})
//Feed API - GET/feed - get all the users from the database
app.get("/feed",async (req,res)=>{
  try{
      const users = await  User.find({});
      res.send(users);
  }catch(err){
    res.status(400).send("Something went wrong ");
  }

})

app.delete("/user",async (req,res)=>{
  const userId = req.body.userId;
  try{
    const user = await User.findByIdAndDelete(userId);
    res.send("User deleted sucessfully!!");
  }catch(err){
    res.status(400).send("Something went wrong!!");
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
