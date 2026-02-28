import mongoose from "mongoose"

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ["credit_add", "credit_spend"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 1,
    },
    reason: {
      type: String,
      enum: ["plan_purchase", "generate", "update", "deploy"],
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    balanceAfter: {
      type: Number,
      required: true,
      min: 0,
    },
    externalId: {
      type: String,
      unique: true,
      sparse: true,
    },
    metadata: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
)

const Transaction = mongoose.model("Transaction", transactionSchema)

export default Transaction
