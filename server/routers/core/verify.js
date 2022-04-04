import express from "express";
import { assignProcess, detections, extractions, recognitions } from "../../bride/processes.js";
import { generateRid } from "../../middlewares/rid.js";
import { addMetric } from "../../middlewares/addMetric.js";
import { sendResponse } from "../../utils/sendResponse.js";
const router = express.Router();

router.post("/verify", addMetric,generateRid(2), async (req, res) => {
  try {
    // @ts-ignore
    const { rid,metric } = req;
    let payloads;
    let sign = [];
    metric.calculate("detection");
    payloads = await Promise.all([assignProcess(detections, rid[0], req.body.image_1),assignProcess(detections, rid[1], req.body.image_2)]);
    metric.calculate("detection");
    metric.calculate("extraction");
    payloads = await Promise.all([assignProcess(extractions, rid[0], payloads[0][0]),assignProcess(extractions, rid[1], payloads[1][0])]);
    metric.calculate("extraction");
    sign.push(payloads[0][0]);
    sign.push(payloads[1][0]);
    metric.calculate("recognition");
    payloads = await assignProcess(recognitions, rid[0], sign.join(" "));
    metric.calculate("recognition");
    sendResponse({ req, res, responseData: { result: payloads[0] === "True" }, logRequest: false });
  } catch (err) {
    sendResponse({ err, req, res, logRequest: false });
  }
});
export { router };
