/**
 * @typedef {{
 *  proc: import("child_process").ChildProcess,
 *  load: number,
 *  ts: number,
 * }} Process
 * */

import config from "../utils/config.js";
import { pdebug, perror } from "../utils/logger.js";
import { requests } from "./requests.js";
import { pQuery } from "../utils/postgres.js";
/** @type {Process[]} */
const detections = [];
/** @type {Process[]} */
const extractions = [];
/** @type {Process[]} */
const recognitions = [];
const next = (() => {
  const indexs = new Map();
  /**@type {(arr:any[]) => number} */
  return (arr) => {
    let index = indexs.get(arr);
    if (index == null || index == arr.length) index = 0;
    indexs.set(arr, index + 1);
    return index;
  };
})();

/** @type {(arr:Process[],process:Process) => void} */
function addProcess(arr, process) {
  pdebug("addProcess start");
  arr.push(process);
  pdebug("addProcess end");
}
/** @type {(arr:Process[],rid:number, base64:string) => Promise<string[]>} */
function assignProcess(arr, rid, base64) {
  pdebug("assignProcess start");
  const request = new Promise((resolve, reject) => {
    try {
      let i = next(arr);
      arr[i].proc.stdin.write(rid.toString());
      arr[i].proc.stdin.write(config.PROPERTY_SEPERATOR);
      arr[i].proc.stdin.write(base64);
      arr[i].proc.stdin.write(config.LINE_SEPERATOR);
      arr[i].load += 1;
      requests[rid] = { resolve, reject, ts: Date.now() };
    } catch (err) {
      perror("assignProcess.Promise.catch");
      perror(err);
    }
  });
  pdebug("assignProcess end");
  return request;
}
/** @type {(arr:Process[],proc:import("child_process").ChildProcess,properties:{reduceLoad?:number,ts?:number}) => void} */
function updateProcess(arr, proc, properties) {
  arr.forEach((e) => {
    if (e.proc !== proc) {
      return;
    }
    if (properties.reduceLoad) {
      e.load -= properties.reduceLoad;
    }
  });
}

/** @type {(arr:Process[],proc:import("child_process").ChildProcess) => void} */
function removeProcess(arr, proc) {
  const index = arr.findIndex((e) => e.proc === proc);
  if (index !== -1) {
    arr.splice(index, 1);
  }
}

function cleanProceses() {
  pdebug("cleanProceses start");
  for (const process of [...detections, ...extractions, ...recognitions]) {
    if (!process.proc.exitCode) process.proc.kill();
  }
  pdebug("cleanProceses end");
}

setTimeout(gpuBatchSizes, Math.round(Math.random() * config.LOG_METRIC_AVG_DURATION_IN_MS));
function gpuBatchSizes() {
  setTimeout(gpuBatchSizes, Math.round(Math.random() * config.LOG_METRIC_AVG_DURATION_IN_MS));
  pQuery({
    sql: "insert into monitoring.gpu_batch_sizes values (default,default,$1)",
    parameters: [
      {
        totalDetectionsLoad: detections.reduce((acc, e) => acc + e.load, 0),
        detectionsLoad: detections.map((e) => e.load),
        totalExtractionsLoad: extractions.reduce((acc, e) => acc + e.load, 0),
        extractionsLoad: extractions.map((e) => e.load),
        totalRecognitionsLoad: recognitions.reduce((acc, e) => acc + e.load, 0),
        recognitionsLoad: recognitions.map((e) => e.load),
      },
    ],
  });
}

setTimeout(sendPingToProcess, Math.round(Math.random() * config.CORE_PING_INTERVAL_IN_MS));
function sendPingToProcess() {
  setTimeout(sendPingToProcess, Math.round(Math.random() * config.CORE_PING_INTERVAL_IN_MS));
  let i = 0;
  while (i < detections.length) {
    assignProcess(detections, -1, "");
  }
  i = 0;
  while (i < extractions.length) {
    assignProcess(extractions, -1, "");
  }
  i = 0;
  while (i < recognitions.length) {
    assignProcess(recognitions, -1, "");
  }
}
export { cleanProceses, assignProcess, addProcess, updateProcess, removeProcess, detections, extractions, recognitions };
