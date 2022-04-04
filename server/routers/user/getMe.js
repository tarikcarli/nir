import { pQuery } from "../../utils/postgres.js";
import { sendResponse } from "../../utils/sendResponse.js";
async function getMe(req, res) {
  try {
    const {
      rows: [user],
    } = await pQuery({
      sql: "select * from users where id = $1;",
      // @ts-ignore
      parameters: [req.userId],
    });
    sendResponse({ req, res, responseData: user, logRequest: false, logResponse: false });
  } catch (err) {
    sendResponse({ err, req, res, logRequest: false });
  }
}
export { getMe };
