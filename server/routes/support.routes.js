import express from "express"
import multer from "multer"
import { submitSupport } from "../controllers/support.controller.js"

const supportRouter = express.Router()
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } })

supportRouter.post("/", upload.single("screenshot"), submitSupport)

export default supportRouter
