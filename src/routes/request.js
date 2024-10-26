const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user");
requestRouter.post("/request/send/:status/:toUserId",userAuth,
  async(req,res)=>{
    try{
     const fromUserId=req.user._id;
     const toUserId=req.params.toUserId;
     const status=req.params.status;

const allowedStatus=["ignored","interested"];

if(!allowedStatus.includes(status)){
  return res.status(400).json({message:"Invalid status type"+status})
}
const toUser=await User.findById(toUserId);
if(!toUser){
  return res.status(404).json({message:"User Not found"})
}
const exitstingRequest=await ConnectionRequestModel.findOne({
  $or:[
    {fromUserId,toUserId},
    {fromUserId:toUserId,toUserId:fromUserId}
  ]
})
if(exitstingRequest){
 return  res.status(400).send({message:'dupicates connection request'})
}
const connectionRequest=new ConnectionRequestModel({
  fromUserId,
  toUserId,
  status,
})
const data=await connectionRequest.save();
res.json({
  message:req.user.firstName+" is "+ status+toUser.firstName,
  data,
})
    }
    catch(err){
      res.status(400).send("ERROR: " + err.message);
    }
  }
)

module.exports = requestRouter;
// requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
//   const user = req.user;
//   // Sending a connection request
//   console.log("Sending a connection request");
//   res.send(user.firstName + "sent the connect request!");
// });
// requestRouter.post(
//   "/request/send/:status/:toUserId",
//   userAuth,
//   async (req, res) => {
//     try {
//       const fromUserId = req.user._id;
//       const toUserId = req.params.toUserId;
//       const status = req.params.status;

//       const connectionRequest = new ConnectionRequestModel({
//         fromUserId,
//         toUserId,
//         status,
//       });
//       const data = await connectionRequest.save();
//       res.json({
//         message:
//           "Connection request Send Succesfully",
//         data,
//       });
//     } catch (err) {
//       res.status(400).send("ERROR: " + err.message);
//     }
//   }
// );

// module.exports = requestRouter;