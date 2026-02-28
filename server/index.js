import express from "express"
import dotenv from "dotenv"
dotenv.config()
import connectDb from "./config/db.js"
import authRouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import mongoose from "mongoose"
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
app.set("trust proxy", 1)

const allowedOrigins = [
    process.env.CLIENT_URL,
    process.env.FRONTEND_URL,
    process.env.CORS_ORIGIN,
].filter(Boolean)

if (process.env.NODE_ENV !== "production") {
    allowedOrigins.push("http://localhost:5173")
}

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) {
            return callback(null, true)
        }

        if (allowedOrigins.includes(origin)) {
            return callback(null, true)
        }

        return callback(new Error("Not allowed by CORS"))
    },
    credentials:true
}))
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/website",websiteRouter)
app.use("/api/billing",billingRouter)
app.use("/api/support",supportRouter)


app.get("/api/health", (req, res) => {
    const states = ["disconnected", "connected", "connecting", "disconnecting"]
    const dbState = states[mongoose.connection.readyState] || "unknown"
    return res.status(200).json({ status: "ok", db: dbState })
})

const startServer = () => {
    app.listen(port,()=>{
        console.log("server started")
    })

    const tryConnect = async () => {
        const ok = await connectDb()
        if (!ok) {
            setTimeout(tryConnect, 5000)
        }
    }
    tryConnect()
}

startServer()
