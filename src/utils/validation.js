const validator = require("validator");
const validateSignUpData = (req) => {
       const {firstName,lastName,emailId,password} = req.body;

       if(!firstName || !lastName){
        throw new Error("First name and last name are required fields");
       }
       else if (!validator.isEmail(emailId)){
        throw new Error("Email is not valid:" + emailId);
       }
       else if (!validator.isStrongPassword(password)){
        throw new Error("Password is not strong enough:" + password);
       }
       
}

module.exports = {
    validateSignUpData,
}
