import express from "express";
import { router as coreRouter } from "../core/core.js";
import { router as userRouter } from "../user/user.js";
const router = express.Router();

router.use(coreRouter);
router.use(userRouter);

export { router };
