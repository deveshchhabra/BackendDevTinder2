const express=require("express");
const userRouter=express.Router();
const {userAuth} =require("../middleware/auth")
const connectionRequest=require("../models/connectionRequest");
const ConnectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user");
userRouter.get("/user/requests/received",userAuth,async(req,res)=>{
    try{
        const loggedInUser=req.user;
        const connectionRequests=await connectionRequest.find({
            toUserId:loggedInUser._id,
            status:"interested",
        }).populate("fromUserId","firstName lastName emailId")
        res.json({message:"Data fetched Sucessfully",
            data:connectionRequests
        })
    }
    catch(err){
        res.status(404).send("ERROR:"+err.message);
    }
})
const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";
userRouter.get("/user/connections",userAuth,async(req,res)=>{
    try{
        const loggedInUser=req.user;
        const connectionRequests=await connectionRequest.find({
            $or:[
                {toUserId:loggedInUser._id,status:"accepted"},
                {fromUserId:loggedInUser._id,status:"accepted"},
            ]
        }).populate("fromUserId",USER_SAFE_DATA)
        .populate("toUserId",USER_SAFE_DATA);
        const data=connectionRequests.map((row)=>{
            if(row.fromUserId._id.toString()===loggedInUser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId;

        })
        res.json({data})
    }
    catch(err){
        res.status(400).send({message:err.message})
    }
})
   //User should see all the user cards except
        //0. His own cards
        //1. His connection
        //2. Ignored connection
        //3. Already sent the connection request

        //Example -: Rahul=[Mark,Donald,Ms Dhoni,Virat]
        //R ->Aksahay->rejected R->Elon->Accpeted
        //Elon ->Doesnot see rahul 
        //Akshay ->Doesnit see Akshay because -> Rejected
userRouter.get("/feed",userAuth,async(req,res)=>{
    try{
        const loggedInUser=req.user;
        const page=parseInt(req.query.page)|| 1;
        let limit=parseInt(req.query.limit) ||10; 
        limit = limit > 50 ? 50 : limit;
        const skip= (page-1)*limit;
        const connectionRequest = await ConnectionRequestModel.find({
            $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
          }).select("fromUserId  toUserId");
        
        console.log(connectionRequest)
        const hideUsersFromFeed = new Set();
        connectionRequest.forEach((req) => {
          hideUsersFromFeed.add(req.fromUserId.toString());
          hideUsersFromFeed.add(req.toUserId.toString());
        });
        console.log(User)
        const users = await User.find({
            $and: [
              { _id: { $nin: Array.from(hideUsersFromFeed) } },
              { _id: { $ne: loggedInUser._id } },
            ],
          }).select(USER_SAFE_DATA).skip(skip).limit(limit);
        //   console.log(users)
        res.json({data:users});
    }catch(err){
        res.status(400).json({message:err.message});
    }
})
module.exports=userRouter;