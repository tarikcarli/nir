import path from "path";
import config from "../utils/config.js";
import { detections, extractions, recognitions } from "./processes.js";
import { startProcess } from "./startProcess.js";

function startCore(instanceSize, startFunction) {
  let i = 0;
  while (i < instanceSize) {
    startFunction();
    i += 1;
  }
}
// @ts-ignore
const dirname = import.meta.url.replace("file://", "");
console.log(dirname);
console.log(path.join(dirname, "..", "..", "..", "core/py/detect-align/detect_align.py"));
function startCores() {
  startCore(config.DETECTION_INSTANCE_SIZE - detections.length, () =>
    startProcess(detections, "python3", [path.join(dirname, "..", "..", "..", "core/py/detect-align/detect_align.py")])
  );
  startCore(config.EXTRACTION_INSTANCE_SIZE - extractions.length, () =>
    startProcess(extractions, "python3", [path.join(dirname, "..", "..", "..", "core/py/extractor/extractor.py")])
  );
  startCore(config.RECOGNITION_INSTANCE_SIZE - recognitions.length, () =>
    startProcess(recognitions, "python3", [path.join(dirname, "..", "..", "..", "core/py/recognizer/recognizer.py")])
  );
}
export { startCores };
