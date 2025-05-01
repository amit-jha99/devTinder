const validator = require("validator");
const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("First name and last name are required fields");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid:" + emailId);
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough:" + password);
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "emilId",
    "age",
    "gender",
    "photoUrl",
    "about",
    "skills",
  ];
  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  ); //This will return true if all the fields are valid
  return isEditAllowed; //This will return true if all the fields are valid

};
module.exports = {
  validateSignUpData,
  validateEditProfileData,
};
