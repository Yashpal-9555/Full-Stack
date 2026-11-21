import User from "../Models/User.js";
import Message from "../Models/Message.js";
import cloudinary from "../config/cloudinary.js";
import { io, UserScoketMap } from "../server.js";

// Get all users except the logged in user

export const getUserForSidebar = async (req, res)=>{
    try {
        const userId = req.user._id;
        const filterUsers = await User.find({_id:{$ne:userId}}).select("-password");

        // Count number of messages not seen by the logged in user for each user
        const unseenMessages = {}
        const promises = filterUsers.map(async (user) => {
            const messages = await Message.find({senderId: user._id, seen: false, receiver: userId});
            if(messages.length>0) {
                unseenMessages[user._id] = messages.length;
            }
        })
        await Promise.all(promises);
        res.json({success: true, users: filterUsers, unseenMessages});
    } catch (error) {
        console.log(error.message);
        res.json({success: false, messages:error.message});
       
    }

}

// Get all messages for selected users

export const getMessages = async (req, res)=>{
    try {
        const {id:selectedUserId} = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or:[
                {senderId: myId, receiverId: selectedUserId},
                {senderId: selectedUserId, receiverId: myId},
            ]
        })
        await Message.updateMany({senderId: selectedUserId, receiverId: myId}, {seen: true});
        res.json({success:true, messages});
    } catch (error) {
        console.log(error.message);
        res.json({success: false, messages:error.message});
    }
}


// api to mark messages as seen for a particular user

export const markMessageAsSeen = async(req, res)=>{
    try{
        const {id} = req.params;
        await Message.findByIdAndUpdate(id, {seen: true});
        res.json({success:true, message:"Message marked as seen"});
    }
    catch(error){
        console.log(error.message);
        res.json({success: false, messages:error.message});
    }
}

// Send a message to a user
export const sendMessage = async(req, res)=>{
    try{
        const {text, image} = req.body;

        const receiverId = req.params.id;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.unsigned_upload(image, "ml_default");
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = await Message.create({
            senderId,
            receiverId,
            text,
            image: imageUrl
        })

        // Emit the new message to the receiver if they are online
        const receiverSocketId = UserScoketMap[receiverId];
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.json({success:true, newMessage});
    }
    catch(error){
        console.error("Message send failed:", error.message);
        res.status(error.http_code || 500).json({success: false, message:error.message});
    }
}
