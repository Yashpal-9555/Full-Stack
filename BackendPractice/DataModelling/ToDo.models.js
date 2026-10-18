import mongoose, { Mongoose } from "mongoose";

const todoSchema = new mongoose.Schema({
    content : {
        type: String,
        required: true,
    },
    complete: {
        type: Boolean,
        default: false,
    },
    createdby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    subTodos : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "subtodo",
        }
    ] // array of sub todos
},{timestamps:true})

export const Todo = mongoose.model("Todo",todoSchema);