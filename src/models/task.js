import mongoose from "mongoose";

const taskScheme = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name cannot be empty"],
        unique:true,
        maxLength:[20,"name cannot be more than 20 charaters"],
        minLength:[5,"name cannot be less then 5 characters"],
        trime:true
    },
    completed:{
        type:Boolean,
        default:false,
    }
})

export const Task = mongoose.model("Task",taskScheme)