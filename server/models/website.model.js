import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
  role: { type: String, enum: ["user", "ai"], required: true },
  content: { type: String, required: true },
}, { _id: false });

const websiteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  title: { type: String, required: true },
  latestCode: { type: String, required: true },
  conversation: { type: [conversationSchema], default: [] },
  slug: { type: String, unique: true, sparse: true },
  deployed: { type: Boolean, default: false },
  deployUrl: { type: String, default: "" },
}, { timestamps: true });

const Website = mongoose.model("Website", websiteSchema);
export default Website;
