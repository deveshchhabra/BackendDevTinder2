const express=require('express');//It is code comming Node.Js
const connectDB=require('./config/database');
const app = express()
const cookieParser = require("cookie-parser");
const cors = require('cors')
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.json());
const authRouter=require('./routes/auth');
const profileRouter=require('./routes/profile');
const requestRouter=require('./routes/request');
const userRouter = require('./routes/user');
const cors = require('cors')
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}));

// const jwt = require("jsonwebtoken");
app.use("/",authRouter)
app.use("/",profileRouter)
app.use("/",requestRouter)
app.use("/",userRouter)

app.use(cors({
  origin: 'http://localhost:5173', // Replace with the actual origin
  credentials: true // Allows cookies and other credentials
}));
connectDB()
  .then(() => {
    console.log('Mongoose connection sucessfully')
    app.listen(3000, () => {
      console.log('Server is SuccessFull....3000')
    })
  }).catch(err => {
    console.log('Database is cannot connected', err.message)
  })


















  // app.get('/user', async (req, res) => {
  //   const userEmail = req.body.emailId
  //   console.log(userEmail)
  
  //   try {
  //     const users = await User.findOne({ emailId: '670518508c8fd5a149c8a9ca' })
  //     if (!users) {
  //       res.status(404).send('User Not Found')
  //     } else {
  //       res.send(users)
  //     }
  //     //       if(users.length===1){
  //     // res.status(404).send('User Not Found')
  //     //       }else{
  //     //         res.send(user);
  //     //     }
  //   } catch (err) {
  //     res.status(400).send('Something Went Wrong')
  //   }
  // })
  
  // app.get('/feed', async (req, res) => {
  //   try {
  //     const users = await User.find({})
  //     res.send(users)
  //   } catch (err) {
  //     res.status(404).send('Something Went Wrong')
  //   }
  // })
  // app.delete('/user', async (req, res) => {
  //   const UserId = req.body.userId
  //   // console.log(UserId)
  //   try {
  //     const user = await User.findByIdAndDelete(UserId)
  //     console.log(user)
  //     res.send('User Deleted Successfully')
  //   } catch (err) {
  //     res.status(400).send('something Went wrong')
  //   }
  // })
  // app.patch('/user/:userId', async (req, res) => {
  //   const UserId = req.params?.userId
  //   const data = req.body
  
  //   try {
  //      const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
  //      const isUpdateAllowed = Object.keys(data).map((k)=>{
  //        ALLOWED_UPDATES.includes(k)
  //      }
  //      );
  //      if (!isUpdateAllowed) {
  //        throw new Error("Update not allowed");
  //      }
  //      if(data?.skills.length>10){
  //         throw new Error("Not More Than 10")
  //      }
  //     const user = await User.findByIdAndUpdate({ _id: UserId }, data, {
  //       runValidators: true
  //     })
  //     res.send('user updated sucessfully')
  //   } catch (err) {
  //     res.status(400).send('something went wrong' + err.message)
  //   }
  // })
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
// app.post('/user',(req,res)=>{
//     res.send("Data successfully saved to database!!!");
// })
// app.delete("/user",(req,res)=>{
//     res.send("deleted from the databases")
// })
// app.use('/hello',(req,res)=>{
//         res.send("Jai shree Ram")})
// app.use('/',(req,res)=>{
//     res.send("Nameste DEV")})

