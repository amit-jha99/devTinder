const express = require("express");

const app = express();

//This will only handle GET call to /user
app.get("/user",(req,res)=>{
    res.send({
        "Firstname" :"Amit",
        "Lastname" :"Jha",
        "Aura" :"Founder and CEO,CTO at Krishit&Party"
    });
})

app.post("/user",(req,res)=>{
  //saving the data to database
  res.send("Data successfully saved to database");
})

app.delete("/user",(req,res)=>{
    res.send("Deleted successfully!");
})
//This will match all the HTTP method API calls to /test
app.use("/test",(req,res)=>{
    res.send("Hello from the server!!");
});



app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});