import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import customerRoutes from "./routes/customerroutes.js";
import fabricRoutes from "./routes/fabricroutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/customers", customerRoutes);
app.use("/api/fabrics", fabricRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT || 5000, () => {
      console.log("Server running...");
    });
  })
  .catch((err) => console.log("Connection failed:", err.message));




