import express from "express"

import isAuth from "../middlewares/isAuth.js"
import { billing, getBillingHistory } from "../controllers/billing.controller.js"


const billingRouter=express.Router()

billingRouter.post("/",isAuth,billing)
billingRouter.get("/history",isAuth,getBillingHistory)


export default billingRouter
