import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    fullName:{
        type:String,
        require:true
    },
    username:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        minLength:5,
        require:true
    },
    gender:{
        type:String,
        require:true
    },
    profilePic:{
        type:String,
        default:""
    }
},{timestamps:true})

const userModel = mongoose.model("User",userSchema)

export default userModel;