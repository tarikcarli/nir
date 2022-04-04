import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "./config.js";

function setCookie({
  res,
  key = "AUTH_TOKEN",
  value,
  domain = config.COOKIE_DOMAIN,
  path = "/",
  httpOnly = false,
  maxAge = config.JWT_EXPIRES_IN,
}) {
  res.cookie(key, value, { domain, path, maxAge, httpOnly });
}

function clearCookie({ res, key = "AUTH_TOKEN", domain = config.COOKIE_DOMAIN, path = "/" }) {
  res.clearCookie(key, { domain, path, expires: new Date(Date.now()) });
}

async function createToken(data) {
  return new Promise((resolve, reject) => {
    jwt.sign(data, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRES_IN }, (err, token) => {
      if (err) {
        reject(err);
      }
      resolve(token);
    });
  });
}
function createHash(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, function (err, hash) {
      if (err) reject(err);
      if (!err) resolve(hash);
    });
  });
}
export { setCookie, clearCookie, createToken, createHash };
