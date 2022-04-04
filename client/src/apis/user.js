import { sendRequest } from "./sendRequest.js";
export function getMe() {
  sendRequest("/api/user/getMe");
}

export function setMe(firstName, lastName) {
  sendRequest("/api/user/setMe", { body: JSON.stringify({ firstName, lastName }) });
}

export function login(email, password) {
  sendRequest("/api/user/login", { body: JSON.stringify({ email, password }) });
}
export function register(email, password) {
  sendRequest("/api/user/register", { body: JSON.stringify({ email, password }) });
}
