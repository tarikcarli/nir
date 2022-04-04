import { useState } from "react";
import Button from "../components/button";
import { setMsg } from "../state/meta.js";
import { login, register } from "../apis/user";
import { useNavigate } from "react-router-dom";
import { paths } from "../utils/paths";
export default function Landing() {
  const navigate = useNavigate();
  const [comp, setComp] = useState("LOGIN");
  return (
    <div className="flex flex-row h-full w-full justify-center items-center">
      <div className="flex flex-row max-w-max max-h-max px-2 py-1 border-2 rounded-md border-gray-300 bg-gray-200 transform  -translate-y-24">
        <div className="flex flex-col w-96">
          <div className="font-semibold text-lg uppercase">Node Image Recognizer</div>
          <div>The project aims is to show true potential of AI/ML to our users.</div>
          <div>You can register then login. You have 100 request per day and it will renew at 12 at night.</div>
          <div>If you would like to have more request or, would like new functionalities</div>
          <img src="landing_dl.jpg" alt="Deep learning neural network representation" className="rounded-md"></img>
          <div>
            <b>contact us</b> via email:"<i>tarik.carli@tubitak.gov.tr</i>"
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row border rounded-md w-64">
            <Button
              onClick={() => setComp("LOGIN")}
              disabled={comp === "LOGIN"}
              text="Login"
              className={`py-1 px-0 w-1/2 rounded-none ${
                comp === "LOGIN" ? "hover:scale-100 hover:bg-gray-800" : "bg-gray-300 hover:bg-gray-300 text-gray-800"
              }`}
            />
            <Button
              onClick={() => setComp("REGISTER")}
              disabled={comp === "REGISTER"}
              text="Register"
              className={`py-1 px-0 w-1/2 rounded-none ${
                comp === "REGISTER"
                  ? "hover:scale-100 hover:bg-gray-800"
                  : "bg-gray-300 hover:bg-gray-300 text-gray-800 "
              }`}
            />
          </div>
          {comp === "LOGIN" && (
            <div className="flex flex-col h-full w-full justify-center items-center">
              <form
                onSubmit={async (e) => {
                  try {
                    e.preventDefault();
                    let email, password;
                    email = e.target[0].value;
                    password = e.target[1].value;
                    await login(email, password);
                    navigate(paths.home);
                  } catch (err) {}
                }}
              >
                <label htmlFor="email">
                  <div>Email</div>
                  <input className="focus:outline-none" name="email" id="email" type="text" />
                </label>

                <label htmlFor="password">
                  <div>Password</div>
                  <input className="focus:outline-none" name="password" id="password" type="password" />
                </label>
                <div className="mt-1 w-full">
                  <Button type="submit" text="Login" className="w-full" />
                </div>
              </form>
            </div>
          )}
          {comp === "REGISTER" && (
            <div className="flex flex-col h-full w-full justify-center items-center">
              <form
                onSubmit={async (e) => {
                  try {
                    e.preventDefault();
                    let email, password, repassword;
                    email = e.target[0].value;
                    password = e.target[1].value;
                    repassword = e.target[2].value;
                    if (password !== repassword) {
                      setMsg("Passwords must be matched");
                    }
                    await register(email, password);
                    setMsg("Registration is successful. Checkout your inbox to validate user", "info");
                    setComp("LOGIN");
                  } catch (err) {}
                }}
              >
                <label htmlFor="email">
                  <div>Email</div>
                  <input className="focus:outline-none" name="email" id="email" type="text" />
                </label>

                <label htmlFor="password">
                  <div>Password</div>
                  <input className="focus:outline-none" name="password" id="password" type="password" />
                </label>
                <label htmlFor="repassword">
                  <div>Password Validate</div>
                  <input className="focus:outline-none" name="repassword" id="repassword" type="password" />
                </label>
                <div className="mt-1 w-full">
                  <Button type="submit" text="Register" className="w-full" />
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
