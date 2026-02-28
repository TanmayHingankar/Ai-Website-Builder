import mongoose from "mongoose"

const connectDb=async ()=>{
    try {
        if (!process.env.MONGODB_URL) {
            console.error("db error: MONGODB_URL is missing")
            return false
        }
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("db connected")
        return true
    } catch (error) {
        console.error("db error:", error?.message || error)
        return false
    }
}

export default connectDb
