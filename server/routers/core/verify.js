import express from "express";
import { assignProcess, detections, extractions, recognitions } from "../../bride/processes.js";
import { generateRid } from "../../middlewares/rid.js";
import { pdebug } from "../../utils/logger.js";
import { sendResponse } from "../../utils/sendResponse.js";
const router = express.Router();

router.post("/verify", generateRid(2), async (req, res) => {
  try {
    // @ts-ignore
    const { rid } = req;
    let payload;
    let sign = [];
    payload = await assignProcess(detections, rid[0], req.body.image_1);
    payload = await assignProcess(extractions, rid[1], payload[0]);
    sign.push(payload[0]);
    payload = await assignProcess(detections, rid[0], req.body.image_2);
    payload = await assignProcess(extractions, rid[1], payload[0]);
    sign.push(payload[0]);
    payload = await assignProcess(recognitions, rid[0], sign.join(" "));
    sendResponse({ req, res, responseData: { result: payload[0] === "True" }, logRequest: false });
  } catch (err) {
    sendResponse({ err, req, res, logRequest: false });
  }
});
export { router };
