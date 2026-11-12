import express from "express";
import { register, login, refresh, getProfile, updateProfile } from "../controller/customerauthcontroller.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/auth/register", register);
router.post("/auth/login", login);
router.post("/auth/refresh", refresh);

router.get("/me", protect, getProfile);
router.patch("/me", protect, updateProfile);

export default router;