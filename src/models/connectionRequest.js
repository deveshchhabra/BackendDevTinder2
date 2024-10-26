
const moongose=require("mongoose")

const connectionRequestSchema=new moongose.Schema({
    fromUserId:{
        type:moongose.Schema.Types.ObjectId,
        required:true,
    },
    toUserId:{
        type:moongose.Schema.Types.ObjectId,
        required:true,
    },
    status:{
        type:String,
        required:true,
        enum:{
            values:["ignored","interested","accepted","rejected"],
        message:`{value} is invalid`
        }
    }
},{timestamps:true}
);
connectionRequestSchema.index({fromUserId:1,toUserId:1});
connectionRequestSchema.pre("save", function (next) {
    const connectionRequest = this;//full object comes
    // Check if the fromUserId is same as toUserId
    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
      throw new Error("Cannot send connection request to yourself!");
    }
    next();
  });
const ConnectionRequestModel =new moongose.model(
    "ConnectionRequest",
    connectionRequestSchema
);
module.exports=ConnectionRequestModel;
