import { spawn } from "child_process";
import config from "../utils/config.js";
import { pdebug } from "../utils/logger.js";
import { addProcess, updateProcess } from "./processes.js";
import { requests } from "./requests.js";

/** @type {(arr:import("./processes").Process[],command:string,path:string[]) => void} */
function startProcess(arr, command, args) {
  pdebug("startProcess start");
  const proc = spawn(command, args);

  let outHalf = "";
  proc.stdout.on("data", (chunk) => {
    pdebug("proc.stdout.on.data start");
    const base64 = chunk.toString();
    const base64Arr = base64.split(config.LINE_SEPERATOR);
    base64Arr[0] = outHalf.concat(base64Arr[0]);
    outHalf = base64Arr.pop();
    let reduceLoad = 0;
    for (const base64e of base64Arr) {
      const [rid, ...payload] = base64e.split(config.PROPERTY_SEPERATOR);
      if (rid === "-1") {
        updateProcess(arr, proc, { ts: Date.now() });
        continue;
      }
      if (!requests[rid]) {
        continue;
      }
      requests[rid].resolve(payload);
      delete requests[rid];
      reduceLoad += 1;
    }
    updateProcess(arr, proc, { reduceLoad });
    pdebug("proc.stdout.on.data end");
  });

  let errHalf = "";
  proc.stderr.on("data", (chunk) => {
    pdebug("proc.stderr.on.data start");
    const base64 = chunk.toString();
    const base64Arr = base64.split(config.LINE_SEPERATOR);
    base64Arr[0] = errHalf.concat(base64Arr[0]);
    errHalf = base64Arr.pop();
    let reduceLoad = 0;
    for (const base64e of base64Arr) {
      const [rid, ...payload] = base64e.split(config.PROPERTY_SEPERATOR);
      if (!requests[rid]) {
        continue;
      }
      requests[rid].reject(new Error(payload[0]));
      delete requests[rid];
      reduceLoad += 1;
    }
    updateProcess(arr, proc, { reduceLoad });
    pdebug("proc.stderr.on.data end");
  });

  addProcess(arr, { proc, load: 0, ts: Date.now() });
  pdebug("startProcess end");
}

export { startProcess };
