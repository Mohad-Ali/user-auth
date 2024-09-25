import jwt from "jsonwebtoken"
import userModel from "../models/user.model.js";

const protectRoute=async(req,res,next)=>{
   try {
    const token = req.cookies.jwt;
    if(!token){
        return res.status(401).json({error:"unauthorized no token"})
    }

    const decode = jwt.verify(token,process.env.JWT_SECRET)
    if(!decode){
        return res.status(401).json({error:"unauthorized token"})
    }

    const user = await userModel.findById(decode.userId).select("-password")
    if(!user){
        return res.status(500).json({error:"user not found"})
    }

    req.user = user

    next();
   } catch (error) {
    console.log("error in middleware protectroute",error.message)
    res.status(500).json({error:"internal server error"})
   } 
   

}
export default protectRoute;