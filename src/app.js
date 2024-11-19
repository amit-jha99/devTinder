const express = require("express");

const app = express();

//This will only handle GET call to /user
// app.get("/user/:userId/:name/:password",(req,res)=>{
//     // console.log(req.query);
//     console.log(req.params);
//     res.send({
//         "Firstname" :"Amit",
//         "Lastname" :"Jha",
//         "Aura" :"Founder and CEO,CTO at Krishit&Party"
//     });
// })

app.use("/user",(req,res,next)=>{
    console.log("Handling route 1!!")
    next();
    // res.send("Response 1");
},(req,res)=>{
    console.log("Handling route 2!!")
    res.send("Response 2");
},(req,res)=>{
    console.log("Handling route 3!!")
    res.send("Response 3");
},(req,res)=>{
    console.log("Handling route 4!!")
    res.send("Response 4");
})





app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});