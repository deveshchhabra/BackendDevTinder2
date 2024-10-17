const validator=require('validator')
const bcrypt = require('bcrypt');
    const  validateSignUpData= (req) => {
  const {firstName,lastName,emailId,password}=req.body;
  if(!firstName ||!lastName){
    throw new Error("Name is not valid");
  }
//   else if(firstName.length<4||firstName.length>50){
//     throw new Error("First Name should be 4 to 50");
//   }
else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid!");
}

else if(!validator.isStrongPassword(password)){
    throw new Error("Email is not valid")
}
}

module.exports={
    validateSignUpData,
} 