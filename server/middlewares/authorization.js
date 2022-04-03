import { perror } from "../utils/logger.js";
import { pQuery } from "../utils/postgres.js";
import { sendResponse } from "../utils/sendResponse.js";

const PERMISSIONS = {};

function authorize(permissionId) {
  /** @type {import("express").Handler} */
  return async (req, res, next) => {
    const message = "İşlemi gerçekleştirmek için yetki gerekli";
    try {
      const isAuthenticated = await isAuthorized(req, permissionId);
      if (isAuthenticated) {
        next();
      } else {
        sendResponse({ req, res, responseStatus: 403, responseData: { message } });
      }
    } catch (err) {
      perror(`authorize.catch ${err}`);
      sendResponse({ err, req, res, responseStatus: 403, responseData: { message } });
    }
  };
}
/** @type {(req:import("express").Request,requiredPermissionIdxs:number[]) => Promise<boolean>} */
async function isAuthorized(req, requiredPermissionIdxs) {
  // @ts-ignore
  const userIdx = req.userId;
  const result = await checkPermissions({
    p_user_idx: userIdx,
    p_permission_attribute_list: requiredPermissionIdxs,
  });
  return result;
}

async function checkPermissions({ p_user_idx, p_permission_attribute_list }) {
  const pRes = await pQuery({
    sql: "select * from sp_check_user_permissions($1,$2);",
    parameters: [p_user_idx, p_permission_attribute_list],
  });
  return pRes.rows[0].sp_check_user_permissions;
}

export { authorize, PERMISSIONS };
