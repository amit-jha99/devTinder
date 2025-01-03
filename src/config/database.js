const mongoose = require("mongoose");

const connectDB = async ()=>{
    await mongoose.connect("mongodb+srv://AmitJha:Amit%40777@amit-jha-production.7a2vt.mongodb.net/devTinder");

}

module.exports = connectDB;


