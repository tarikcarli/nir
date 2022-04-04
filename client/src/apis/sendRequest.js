import { DECREMENT_PRC, INCREMENT_PRC, setMsg } from "../state/meta";
import { SET_USER_AUTH_INFO } from "../state/nir";
import { dispatch } from "../state/store";
import { pdebug, perror } from "../utils/logger";

/** @type {(path:string,opt?:RequestInit & {noDispatch?:boolean,timeout?:number})  => Promise<{body:any,status:number}>} */
export async function sendRequest(path, opt = {}) {
  const timeout = opt.timeout ? opt.timeout : 5000;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  opt.signal = controller.signal;
  opt.credentials = "include";
  if (!opt.method) {
    opt.method = "GET";
  }
  if (!opt.headers) {
    opt.headers = {};
  }
  if ((opt.method.toLowerCase() === "post" || opt.method.toLowerCase() === "put") && !opt.headers["Content-Type"]) {
    opt.headers["Content-Type"] = "application/json";
  }
  let res;
  let body;
  !opt.noDispatch && dispatch({ type: INCREMENT_PRC });
  try {
    pdebug("%o", { sending: true, path, opt });
    res = await fetch(path, opt);
    clearTimeout(id);
    body = await res.json();
  } catch (err) {
    perror("%o", err);
    setMsg("İnternet bağlantı hatası, internet bağlantınız olduğundan emin olunuz.");
    throw err;
  } finally {
    // @ts-ignore
    !opt.noDispatch && dispatch({ type: DECREMENT_PRC });
  }
  const status = res?.status;
  pdebug("%o", { path, status, body, opt });
  if (!res || !body) return;
  if (!res.ok) {
    if (status === 401 || status === 403) {
      dispatch({ type: SET_USER_AUTH_INFO, payload: {} });
    }
    setMsg(body.message);
    const httpError = new Error(body.message);
    // @ts-ignore
    httpError.status = res.status;
    perror("%o", httpError);
    throw httpError;
  }
  return { body, status };
}
