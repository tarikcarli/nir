import { pQuery } from "../../utils/postgres.js";
import { sendResponse } from "../../utils/sendResponse.js";

async function setMe(req, res) {
  try {
    const { firstName, lastName } = req.body;
    const {
      rows: [user],
    } = await pQuery({
      sql: "update users set first_name = $1, last_name = $2 where id = $3 returning *;",
      // @ts-ignore
      parameters: [firstName, lastName, req.userId],
    });
    sendResponse({ req, res, responseData: user, logRequest: false, logResponse: false });
  } catch (err) {
    sendResponse({ err, req, res, logRequest: false });
  }
}
export { setMe };
