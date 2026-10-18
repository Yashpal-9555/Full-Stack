import mongoose from "mongoose";

// Create User Schema

const messageSchema = new mongoose.Schema({
   senderId:{type: mongoose.Schema.Types.ObjectId, ref:"User", required: true},
   receiverId:{type: mongoose.Schema.Types.ObjectId, ref:"User", required: true},
   text:{type:String},
   image:{type:String},
   seen: {type: Boolean, default:false}
   
}, {timestamps:true});


// Create message Model

const Message = mongoose.model("Message", messageSchema);

export default Message;