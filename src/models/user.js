const mongoose=require('mongoose')
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

        },
        password:{type:String,
            required:true,

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