import express from "express";
import { assignProcess, detections } from "../../bride/processes.js";
import { generateRid } from "../../middlewares/rid.js";
import { sendResponse } from "../../utils/sendResponse.js";
const router = express.Router();

router.post("/detection", generateRid(1), async (req, res) => {
  try {
    // @ts-ignore
    const payload = await assignProcess(detections, req.rid, req.body.image);
    sendResponse({ req, res, responseData: { image: payload[0] }, logRequest: false, logResponse: false });
  } catch (err) {
    sendResponse({ err, req, res, logRequest: false });
  }
});
export { router };
