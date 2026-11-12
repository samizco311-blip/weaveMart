import mongoose from "mongoose";

const fabricSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  material: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  tier: {
    type: String,
    enum: ["Basic", "Premium", "Luxury"],
    default: "Basic",
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    default: 0,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  description: {
    type: String,
  },
}, { timestamps: true });

const Fabric = mongoose.model("Fabric", fabricSchema);
export default Fabric;