const mongoose=require('mongoose')
const validator = require('validator');
const userSchema=new mongoose.Schema(
    {
        firstName:{type:String,
            required:true,
            minLength:4,
            maxLength:50,
        },
        lastName:{type:String,

        },
        emailId:{
            type:String,
            unique:true,
            lowercase:true,
            trim:true,
            required:true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error("Invalide Email:"+value)
                }
            }

        },
        password: {
            type: String,
            required: true,
            validate(value) {
              if (!validator.isStrongPassword(value)) {
                throw new Error("Enter a Strong Password: " + value);
              }
            },
          },
        age:{type:Number},
        gender:{type:String,
        validate(value){
            if(!["male","female","other"].includes(value)){
                throw new Error("Gender is not valid")
            }
        }
        },
        photoUrl:{type:String,
           default:"https://www.geographyandyou.com/images/user-profile.png",
           validate(value) {
            if (!validator.isURL(value)) {
              throw new Error("Invalid Photo URL: " + value);
            }
          },
        },
        
        about:{type:String,
            default:"This is a photo Url",
        },
        skills:{
            type:[String],
                }
},
{
    timestamps:true,
})
module.exports=mongoose.model("User",userSchema);