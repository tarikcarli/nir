import { metrics } from "../utils/metrics.js";
/** @type {import("express").Handler} */
function addMetric(req, res, next) {
  // @ts-ignore
  req.metric = metrics();
  next();
}

export { addMetric };
