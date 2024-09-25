import userModel from "../models/user.model.js"
import bcrypt from "bcryptjs"
import generateToken from "../utils/generateToken.js"

export const signup=async(req,res)=>{

   try {
    const {fullName,username,password,confirmPassword,gender}=req.body
    if(password !== confirmPassword){
       return res.status(400).json({error:"password not match"})
    }

    const user = await userModel.findOne({username})

    if(user){
      return res.status(400).json({error:"user already created"})
    }

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password,salt)

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

    const newUser=  new userModel({
        fullName,
        username,
        password:hashPassword,
        gender,
        profilePic: gender === "male" ? boyProfilePic: girlProfilePic,
    })

    if(newUser){
       
    generateToken(newUser._id,res)

    await newUser.save()

    res.status(201).json({
        _id:newUser._id,
        fullName:newUser.fullName,
        username:newUser.username,
        gender:newUser.gender,
        profilePic:newUser.profilePic
    })
}else{
    res.status(400).json({error:"invalid user data"})
}

   } catch (error) {
    console.log("error in signin controller",error.message)
    res.status(500).json({error:"internal server error"})
   }
}



export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required." });
    }

    const user = await userModel.findOne({ username });
    if(!user){
      return res.status(400).json({ error: "Incorrect username or password." })
    }
    
    const checkPassword = await bcrypt.compare(password, user.password)
    if(!checkPassword){
      return res.status(400).json({ error: "Incorrect username or password." })
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.error("Error in login controller:", error.message);
    res.status(500).json({ error: "Internal server error." });
  }
};



export const logout=(req,res)=>{
  try {
    res.cookie("jwt","",{maxAge:0});
    res.status(200).json({message:"logout successfully"})
    
  } catch (error) {
    console.log("error in logout controller",error.message)
    res.status(500).json({error:"internal server error"})
  }
    console.log("logout")
}