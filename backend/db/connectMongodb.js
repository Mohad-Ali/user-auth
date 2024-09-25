import mongoose from "mongoose";

const connectMongodb=async()=>{
   try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("mongodb connected")
   } catch (error) {
    console.log("error connecting mongodb",error.message)
   }
}

export default connectMongodb