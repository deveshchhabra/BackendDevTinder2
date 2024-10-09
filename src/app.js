const express=require('express');//It is code comming Node.Js
const connectDB=require('./config/database');
const app=express();
const User=require("./models/user")
app.use(express.json())
app.post('/signup',async(req,res)=>{
    const user=new User(req.body);
    // const user=new User({
        
    //     firstName:"Akshay",
    //     lastName:"Saini",
    //     emailId:"aksahaysain@gmail.com",
    //     password:"akshay@123",
    // })
    try{

        await user.save();  
        res.send('User Added Sucessfully')
    }
    catch(err){
        res.status(400).send('Error Message',err.message);
    }
})
connectDB().then(()=>{
    console.log("Mongoose connection sucessfully")
    app.listen(3000,()=>{
        console.log("Server is SuccessFull....3000")
    });
})
.catch((err)=>{console.log("Database is cannot connected",err)})























// app.use('/',(req,res)=>{
//     res.send("Jai shree shyam!")
// })
// app.use('/test/2',(req,res)=>{
//     res.send("Hello dev!")
// });
// app.get("/user/",(req,res)=>{
//     console.log(req.query);
//     res.send({firstname:"devesh",lastName:"Chhabra"})
// })
// app.post('/user',(req,res)=>~{
//     res.send("Data successfully saved to database!!!");
// })
// app.delete("/user",(req,res)=>{
//     res.send("deleted from the databases")
// })
// app.use('/hello',(req,res)=>{
//         res.send("Jai shree Ram")})
// app.use('/',(req,res)=>{
//     res.send("Nameste DEV")})

