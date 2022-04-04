import express from "express";
import { activate } from "./activate.js";
import { getMe } from "./getMe.js";
import { login } from "./login.js";
import { register } from "./register.js";
import { setMe } from "./setMe.js";
const router = express.Router();

router.post("/user/activate", activate);
router.get("/user/getMe", getMe);
router.post("/user/login", login);
router.post("/user/register", register);
router.post("/user/setMe", setMe);

export { router };
