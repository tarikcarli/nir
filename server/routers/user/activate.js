import { pQuery } from "../../utils/postgres.js";
import { sendResponse } from "../../utils/sendResponse.js";
async function activate(req, res) {
  try {
    const { hash } = req.query;
    const {
      rows: [userHash],
    } = await pQuery({
      sql: "select * from user_hashes where user_id = $1 and hash = $2 and creation_time > now() - '5 minutes'::interval limit 1;",
      // @ts-ignore
      parameters: [req.userId, hash],
    });
    if (!userHash) {
      throw new Error("There are no user associate with this link, link might be expired");
    }
    await pQuery({
      sql: "update users set active = true where id = $1;",
      // @ts-ignore
      parameters: [req.userId],
    });
    sendResponse({ req, res, responseData: {}, logRequest: false, logResponse: false });
  } catch (err) {
    sendResponse({ err, req, res, logRequest: false });
  }
}
export { activate };
