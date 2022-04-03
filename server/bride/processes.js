/**
 * @typedef {{
 *  proc: import("child_process").ChildProcess,
 *  ready: boolean,
 *  batchSize: number,
 *  loadTime: Date,
 * }} Process
 * */

import config from "../utils/config.js";
import { pdebug } from "../utils/logger.js";
import { requests } from "./requests.js";

/** @type {Process[]} */
const detections = [];
// @ts-ignore
detections.batchSize = config.DETECTION_BATCH_SIZE;
/** @type {Process[]} */
const extractions = [];
// @ts-ignore
extractions.batchSize = config.EXTRACTION_BATCH_SIZE;
/** @type {Process[]} */
const recognitions = [];
// @ts-ignore
recognitions.batchSize = config.RECOGNITION_BATCH_SIZE;

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
    let attemp = 0;
    let i = next(arr);
    // @ts-ignore
    while (attemp < arr.length && !arr[i].ready && arr[i].batchSize > arr.batchSize) {
      i = next(arr);
      attemp += 1;
    }
    if (attemp >= arr.length) {
      reject(new Error("NO_AVAILABLE_CORES"));
    }
    // arr[i].proc.stdin.write(`${rid} ${base64}\n`);
    arr[i].proc.stdin.write(rid.toString());
    arr[i].proc.stdin.write(" ");
    arr[i].proc.stdin.write(base64);
    arr[i].proc.stdin.write("\n");
    arr[i].batchSize += 1;
    requests[rid] = { resolve, reject };
  });
  pdebug("assignProcess end");
  return request;
}
/** @type {(arr:Process[],proc:import("child_process").ChildProcess,properties:{ready?:boolean,reduceBatchSize?:number}) => void} */
function updateProcess(arr, proc, properties) {
  arr.forEach((e) => {
    if (e.proc !== proc) {
      return;
    }
    if (properties.ready) {
      e.ready = properties.ready;
    }
    if (properties.reduceBatchSize) {
      e.batchSize -= properties.reduceBatchSize;
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

export { cleanProceses, assignProcess, addProcess, updateProcess, removeProcess, detections, extractions, recognitions };
