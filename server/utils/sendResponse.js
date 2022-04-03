import { pdebug } from "./logger.js";

/**
 * @type {(first:{
 *  err?:Error,
 *  res:import("express").Response,
 *  req:import("express").Request,
 *  responseStatus?:number,
 *  responseData?:any,
 *  logResponse?: boolean,
 *  logRequest?: boolean,
 *  onlyLog?: boolean,
 *  redirectUrl?: string,
 * }) => Promise<void>
 * }
 * */
async function sendResponse({
  err,
  res,
  req,
  responseStatus = 200,
  responseData = {},
  logResponse = true,
  logRequest = true,
  onlyLog = false,
  redirectUrl,
}) {
  pdebug("sendResponse start");
  if (res.headersSent) return;
  const { method, url, baseUrl, body, query, params } = req;
  pdebug({
    err: err,
    method,
    url,
    baseUrl,
    request: logRequest && { body, query, params },
    response: logResponse && { responseStatus, responseData },
  });
  if (onlyLog) return;
  if (redirectUrl) {
    return res.redirect(redirectUrl);
  }
  if (err) {
    res.status(responseStatus >= 200 && responseStatus < 300 ? 400 : responseStatus).json({ message: err.message });
  } else {
    res.status(responseStatus).json(responseData);
  }
  pdebug("sendResponse end");
}

export { sendResponse };
