import express from "express";
import { router as detectionRouter } from "../core/detection.js";
import { router as verifyRouter } from "../core/verify.js";
const router = express.Router();

router.use(detectionRouter);
router.use(verifyRouter);

export { router };
