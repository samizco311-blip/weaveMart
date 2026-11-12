import express from "express";
import { createFabric, getFabrics, getFabricById } from "../controller/fabriccontroller.js";

const router = express.Router();

router.post("/", createFabric);
router.get("/", getFabrics);
router.get("/:id", getFabricById);

export default router;