import { createHash, setCookie } from "../../utils/auth.js";
import { pQuery } from "../../utils/postgres.js";
import { sendResponse } from "../../utils/sendResponse.js";
async function login(req, res) {
  try {
    const { email, password } = req.body;
    const hash = await createHash(password);
    const {
      rows: [user],
    } = await pQuery({
      sql: "select * from users where email = $1 and password = $2;",
      parameters: [email, hash],
    });
    if (!user) {
      throw new Error("Username or password is wrong");
    }
    setCookie({ res, value: user.id });
    sendResponse({ req, res, responseData: user, logRequest: false, logResponse: false });
  } catch (err) {
    sendResponse({ err, req, res, logRequest: false });
  }
}
export { login };
