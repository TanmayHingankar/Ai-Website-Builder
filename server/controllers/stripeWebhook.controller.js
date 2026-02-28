import stripe from "../config/stripe.js";
import User from "../models/user.model.js";
import Transaction from "../models/transaction.model.js";

export const stripeWebhook=async (req,res) => {
    const sig=req.headers["stripe-signature"]
    let event;
    try {
        event=stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
        )
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"webhook error"})
    }

    if(event.type=="checkout.session.completed"){
        const session=event.data.object
        const userId=session.metadata.userId
        const credits=Number(session.metadata.credits)
        const plan=session.metadata.plan

        const existing = await Transaction.findOne({ externalId: session.id })
        if (existing) {
            return res.json({received:true})
        }

        const user = await User.findByIdAndUpdate(
            userId,
            { $inc:{credits}, plan },
            { new: true }
        )

        if (user) {
            await Transaction.create({
                user: user._id,
                type: "credit_add",
                amount: credits,
                reason: "plan_purchase",
                description: `${plan} plan purchase`,
                balanceAfter: user.credits,
                externalId: session.id,
                metadata: {
                    plan,
                    sessionId: session.id,
                    amountTotal: session.amount_total,
                    currency: session.currency
                }
            })
        }
    }

    return res.json({received:true})


}
