import { pdebug } from "../utils/logger.js";
/** @type {(ridSize:number) => import("express").Handler} */
function generateRid(ridSize = 1) {
  return (req, res, next) => {
    const arr = [];
    for (let i = 0; i < ridSize; i++) {
      arr.push(nextRid());
    }
    // @ts-ignore
    req.rid = arr
    next();
  };
}

let i = 0;
function nextRid() {
  i += 1;
  return i;
}

export { generateRid };
