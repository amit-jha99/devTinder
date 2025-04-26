const mongoose = require('mongoose');
const validator = require('validator');
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:50
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        lowercase:true,
        required:true,
        unique:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invlid email address:" + value);
            }
        }
    },
    password: {
        type: String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Your password is not strong Enter a strong password" + value);
            }
        }
    },
    age: {
        type: Number,
        min: 18,
    },
    gender:{
        type:String,
      validate(value){
        if(!["male","female"].includes(value)){
            throw new Error("Gender data is not valid");
      }
    },
        
    },
    photoUrl:{
        type:String,
        default : "https://www.pngitem.com/pimgs/m/272-2720656_user-profile-dummy-hd-png-download.png",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid URL for photoUrl:" + value);
            }
        }
    },
    about:{
        type:String,
        default:"This is default about of the user"
    },
    skills:{
        type:[String]
    },
    
},{
    timestamps:true
}
);

userSchema.methods.getJWT = async function(){
    const user = this;

    const token = jwt.sign({ _id: user._id }, "AMIT@777$99", {
        expiresIn: "1d",
      });

      return token;
}

userSchema.methods.validatePassword = async function(passwordInputByUser){
    const user = this;
    const passwordHash = user.password; //This is the hashed password from the database
    const isPasswordMatch  = await bycrypt.compare(passwordInputByUser, passwordHash); //This is the password from the request body
    if(!isPasswordMatch){
        throw new Error("Invalid credentials!!");
    }
    return isPasswordMatch;
}

const User = mongoose.model("User",userSchema);
module.exports = User;