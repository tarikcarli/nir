import jwt from "jsonwebtoken";
import config from "../utils/config.js";
import { setCookie, createToken } from "../utils/auth";
import { sendResponse } from "../utils/sendResponse.js";
import { perror } from "../utils/logger.js";

async function authenticate(req, res, next) {
  const message = "Doğrulanmamış kullanıcı, giriş yapınız";
  try {
    const authResult = await isAuthenticated(req, res);
    if (authResult) {
      next();
    } else {
      sendResponse({
        req,
        res,
        responseStatus: 401,
        responseData: { message },
      });
    }
  } catch (err) {
    sendResponse({
      err,
      req,
      res,
      responseStatus: 401,
      responseData: { message },
    });
  }
}

async function isAuthenticated(req, res) {
  try {
    const token = req.cookies.AUTH_TOKEN;
    if (!token) return false;
    const decoded = await verify(token);
    req.userId = decoded.id;
    await refreshAuthToken(res, decoded);
    return true;
  } catch (err) {
    perror(`isAuthenticated.catch ${err}`);
    return false;
  }
}

async function refreshAuthToken(res, decoded) {
  const diff = decoded.exp * 1000 - Date.now();
  if (diff > 0 && diff < 1000 * 60 * 5) {
    const token = createToken({ id: decoded.id });
    setCookie({ res, value: token });
    setCookie({ res, value: decoded.id, key: "AUTH_DATA" });
  }
}

function verify(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(decoded);
    });
  });
}

export { authenticate };
