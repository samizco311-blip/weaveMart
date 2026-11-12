import jwt from "jsonwebtoken"; 
import Customer from "../models/customers.js";


export const protect = async (req, res, next) => { 
    try { 
        let token;
if (req.headers.authorization?.startsWith("Bearer")) {
  token = req.headers.authorization.split(" ")[1];
}

if (!token) {
  return res.status(401).json({ message: "Not authorized, no token" });
}

const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
req.customer = await Customer.findById(decoded.id).select("-password -refreshToken");

if (!req.customer) {
  return res.status(401).json({ message: "Customer not found" });
}

next();
} catch (error) { res.status(401).json({ message: "Not authorized" }); } };