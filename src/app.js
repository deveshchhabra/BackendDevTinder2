const express = require('express') //It is code comming Node.Js
const connectDB = require('./config/database')
const app = express()
const User = require('./models/user')
const bcrypt=require('bcrypt')
app.use(express.json())
const  {validateSignUpData}=require("./utils/validation")
//Akshay@123 "#wspquregt@123"
app.post('/signup', async (req, res) => {
  //validation of the data
  try {
  validateSignUpData(req);
  const {firstName,lastName,emailId,password}=req.body
  console.log(password);
  const passwordHsh=await bcrypt.hash(password,10);
 
  const user = new User({firstName,lastName,emailId,password:passwordHsh})
    await user.save()
    res.send('User Added Sucessfully')
  } 
  catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
})
app.post('/login', async (req, res) => {
  try{
  const {emailId,password}=req.body;
  const user=await User.findOne({emailId:emailId})
  if(!user){
    throw new Error("EmailId is not present in Db");
  }
  const isPasswordValid=await bcrypt.compare(password,user.password)
  if(isPasswordValid){
    res.send("Login in Successfully")
  }
  else {
    throw new Error("Password not valid");
   
  }
}
catch (err) {
  res.status(400).send("ERROR : " + err.message);
}
});
app.get('/user', async (req, res) => {
  const userEmail = req.body.emailId
  console.log(userEmail)

  try {
    const users = await User.findOne({ emailId: '670518508c8fd5a149c8a9ca' })
    if (!users) {
      res.status(404).send('User Not Found')
    } else {
      res.send(users)
    }
    //       if(users.length===1){
    // res.status(404).send('User Not Found')
    //       }else{
    //         res.send(user);
    //     }
  } catch (err) {
    res.status(400).send('Something Went Wrong')
  }
})

app.get('/feed', async (req, res) => {
  try {
    const users = await User.find({})
    res.send(users)
  } catch (err) {
    res.status(404).send('Something Went Wrong')
  }
})
app.delete('/user', async (req, res) => {
  const UserId = req.body.userId
  // console.log(UserId)
  try {
    const user = await User.findByIdAndDelete(UserId)
    console.log(user)
    res.send('User Deleted Successfully')
  } catch (err) {
    res.status(400).send('something Went wrong')
  }
})
app.patch('/user/:userId', async (req, res) => {
  const UserId = req.params?.userId
  const data = req.body

  try {
     const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
     const isUpdateAllowed = Object.keys(data).map((k)=>{
       ALLOWED_UPDATES.includes(k)
     }
     );
     if (!isUpdateAllowed) {
       throw new Error("Update not allowed");
     }
     if(data?.skills.length>10){
        throw new Error("Not More Than 10")
     }
    const user = await User.findByIdAndUpdate({ _id: UserId }, data, {
      runValidators: true
    })
    res.send('user updated sucessfully')
  } catch (err) {
    res.status(400).send('something went wrong' + err.message)
  }
})
connectDB()
  .then(() => {
    console.log('Mongoose connection sucessfully')
    app.listen(3000, () => {
      console.log('Server is SuccessFull....3000')
    })
  })
  .catch(err => {
    console.log('Database is cannot connected', err)
  })

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
