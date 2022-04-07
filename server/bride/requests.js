import config from "../utils/config.js";
import { createError, errorCodes } from "../utils/errorCodes.js";
import { pdebug } from "../utils/logger.js";

/** @type {{[key:string]: {resolve:(arg:any) => void,reject:(e:Error) => void,ts:number} }} */
const requests = {};

timeoutRequest();
function timeoutRequest() {
  pdebug("timeoutRequest start");
  const now = Date.now();
  Object.keys(requests).forEach((key) => {
    if (requests[key].ts < now - config.REQUEST_TIMEOUT_IN_MS) {
      requests[key].reject(createError(errorCodes.REQUEST_TIMEOUT_EXCEED, 504));
      delete requests[key];
    }
  });
  setTimeout(timeoutRequest, config.REQUEST_TIMEOUT_IN_MS);
  pdebug("timeoutRequest end");
}

export { requests };
