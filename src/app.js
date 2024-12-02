const express = require("express");


const app = express();
const {adminAuth,userAuth} = require("./middlewares/auth");
//Handle Auth Middleware for all GET ,POST ...
app.use("/admin",adminAuth);
// app.use("/user",userAuth);

app.post("/user/login",()=>{
    res.send("User logged in successfully");
})

app.get("/user",userAuth,(req,res)=>{
    res.send("User Data Sent");

})



app.get("/admin/getAllData",(req,res)=>{
    res.send("All Data Sent");
})

app.get("/admin/deleteUser",(req,res)=>{
    res.send("Deleted a user");
})

// // GET /users => It checks all the app.xxx("matching route") function

// //This will only handle GET call to /user
// // app.get("/user/:userId/:name/:password",(req,res)=>{
// //     // console.log(req.query);
// //     console.log(req.params);
// //     res.send({
// //         "Firstname" :"Amit",
// //         "Lastname" :"Jha",
// //         "Aura" :"Founder and CEO,CTO at Krishit&Party"
// //     });
// // })

// app.use("/user",(req,res,next)=>{
//     console.log("Handling route 1!!")
//     next();
//     // res.send("Response 1");
// });

// app.use("/user",(req,res,next)=>{
//     console.log("Handling the route user!!");
//     res.send("Response 2");
// });





app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});