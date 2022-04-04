import express from "express";
import { router as detectionRouter } from "./detection.js";
import { router as verifyRouter } from "./verify.js";
const router = express.Router();

router.post("/core", detectionRouter);
router.post("/core", verifyRouter);

export { router };
