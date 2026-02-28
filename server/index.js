import express from "express"
import dotenv from "dotenv"
dotenv.config()
import connectDb from "./config/db.js"
import authRouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRouter from "./routes/user.routes.js"
import websiteRouter from "./routes/website.routes.js"
import billingRouter from "./routes/billing.routes.js"
import supportRouter from "./routes/support.routes.js"
import { stripeWebhook } from "./controllers/stripeWebhook.controller.js"

const app=express()

app.post("/api/stripe/webhook",express.raw({type:"application/json"}),stripeWebhook)
const port=process.env.PORT || 5000
app.use(express.json())
app.use(cookieParser())
const CLIENT_URL = process.env.CLIENT_URL || process.env.FRONTEND_URL || "http://localhost:5173"
app.use(cors({
    origin: CLIENT_URL,
    credentials:true
}))
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/website",websiteRouter)
app.use("/api/billing",billingRouter)
app.use("/api/support",supportRouter)


const startServer = async () => {
    await connectDb()
    app.listen(port,()=>{
        console.log("server started")
    })
}

startServer().catch((error) => {
    console.error("server failed to start:", error?.message || error)
    process.exit(1)
})
