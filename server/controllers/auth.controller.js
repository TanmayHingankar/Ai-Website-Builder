import User from "../models/user.model.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

export const register=async (req,res)=>{
try {
    const {name,email,password}=req.body
    
    if(!name || !email || !password){
        return res.status(400).json({
            message:"name, email, and password are required"
        })
    }

    const existingUser=await User.findOne({email})
    if(existingUser){
        return res.status(400).json({
            message:"User already exists"
        })
    }

    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)

    const user=await User.create({
        name,
        email,
        password:hashedPassword,
        authProvider:"email"
    })

    const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"})

    const isProd = process.env.NODE_ENV === "production"
    res.cookie("token",token,{
        httpOnly:true,
        secure:isProd,
        sameSite:isProd ? "none" : "lax",
        maxAge:7*24*60*60*1000
    })

    const userWithoutPassword=user.toObject()
    delete userWithoutPassword.password
    return res.status(201).json(userWithoutPassword)
} catch (error) {
    console.error("register error:", error)
    return res.status(500).json({message:`register error ${error.message}`})
}
}

export const login=async (req,res)=>{
try {
    const {email,password}=req.body

    if(!email || !password){
        return res.status(400).json({
            message:"email and password are required"
        })
    }

    const user=await User.findOne({email})
    if(!user){
        return res.status(400).json({
            message:"Invalid credentials"
        })
    }

    if(!user.password){
        return res.status(400).json({
            message:"This account uses a different login method"
        })
    }

    const isPasswordValid=await bcrypt.compare(password,user.password)
    if(!isPasswordValid){
        return res.status(400).json({
            message:"Invalid credentials"
        })
    }

    const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"})

    const isProd = process.env.NODE_ENV === "production"
    res.cookie("token",token,{
        httpOnly:true,
        secure:isProd,
        sameSite:isProd ? "none" : "lax",
        maxAge:7*24*60*60*1000
    })

    const userWithoutPassword=user.toObject()
    delete userWithoutPassword.password
    return res.status(200).json(userWithoutPassword)
} catch (error) {
    console.error("login error:", error)
    return res.status(500).json({message:`login error ${error.message}`})
}
}

export const googleAuth=async (req,res)=>{
try {
    const {name,email,avatar}=req.body
    if(!email){
        return res.status(400).json({
            message:"email is required"
        })
    }
    let user=await User.findOne({email})
    if(!user){
      user=await User.create({name,email,avatar,authProvider:"google"})
    }
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"})

    const isProd = process.env.NODE_ENV === "production"
    res.cookie("token",token,{
        httpOnly:true,
        secure:isProd,
        sameSite:isProd ? "none" : "lax",
        maxAge:7*24*60*60*1000
    })

    return res.status(200).json(user)
} catch (error) {
    console.error("googleAuth error:", error)
    return res.status(500).json({message:`google auth error ${error}`})
}
}

export const logOut=async (req,res)=>{
try {
     const isProd = process.env.NODE_ENV === "production"
     res.clearCookie("token",{
        httpOnly:true,
        secure:isProd,
        sameSite:isProd ? "none" : "lax"
    })

    return res.status(200).json({message :"log out successfully"})
} catch (error) {
    return res.status(500).json({message:`log out error ${error}`})
}
}

