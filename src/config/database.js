const mongoose=require("mongoose")
const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://DevTinder:Maruti@devtinder.2d336.mongodb.net/DevTinder")
}
module.exports=connectDB;
