const express = require("express");

const app = express();

//This will only handle GET call to /user
app.get("/user/:userId/:name/:password",(req,res)=>{
    // console.log(req.query);
    console.log(req.params);
    res.send({
        "Firstname" :"Amit",
        "Lastname" :"Jha",
        "Aura" :"Founder and CEO,CTO at Krishit&Party"
    });
})





app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});