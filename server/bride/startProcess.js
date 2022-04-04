import { spawn } from "child_process";
import config from "../utils/config.js";
import { pdebug, perror, pfatal } from "../utils/logger.js";
import { startCores } from "./bride.js";
import { addProcess, updateProcess } from "./processes.js";
import { requests } from "./requests.js";
/** @type {(arr:import("./processes").Process[],path:string) => void} */
function startProcess(arr, path) {
  pdebug("startProcess start");
  const proc = spawn("python3", [path]);

  proc.on("exit", (code, signal) => {
    perror(`startProcess.proc.on.exit code:${code} signal:${signal} pid:${proc.pid}`);
    startCores();
  });

  proc.on("error", (err) => {
    perror(`startProcess.proc.on.error ${err}`);
    startCores();
  });

  let outHalf = "";
  proc.stdout.on("data", (chunk) => {
    pdebug("proc.stdout.on.data start");
    const base64 = chunk.toString();
    // pdebug(base64);
    const base64Arr = base64.split("\n");
    base64Arr[0] = outHalf.concat(base64Arr[0]);
    outHalf = base64Arr.pop();
    let reduceBatchSize = 0;
    for (const base64e of base64Arr) {
      const [rid, ...payload] = base64e.split(" ");
      requests[rid].resolve(payload);
      delete requests[rid];
      reduceBatchSize += 1;
    }
    updateProcess(arr, proc, { reduceBatchSize });
    pdebug("proc.stdout.on.data end");
  });

  let errHalf = "";
  proc.stderr.on("data", (chunk) => {
    try {
      pdebug("proc.stderr.on.data start");
      const base64 = chunk.toString();
      pfatal(base64);
      const base64Arr = base64.split("\n");
      base64Arr[0] = errHalf.concat(base64Arr[0]);
      errHalf = base64Arr.pop();
      let reduceBatchSize = 0;
      for (const base64e of base64Arr) {
        const [rid, ...payload] = base64e.split(" ");
        requests[rid].reject(new Error(payload[0]));
        delete requests[rid];
        reduceBatchSize += 1;
      }
      updateProcess(arr, proc, { reduceBatchSize });
    } catch (err) {
      pfatal("XXX");
      pfatal(chunk.toString());
      pfatal(err);
    }
    pdebug("proc.stderr.on.data end");
  });

  addProcess(arr, { proc, batchSize: 0, ready: false, loadTime: new Date() });
  setTimeout(() => {
    updateProcess(arr, proc, { ready: true });
  }, config.CORE_INITIALISATION_DURATION_MS);
  pdebug("startProcess end");
}

export { startProcess };
