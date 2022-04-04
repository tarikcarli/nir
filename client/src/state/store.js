import { createStore } from "redux";
import { combineReducers } from "redux";
import nir from "./nir";
import meta from "./meta";
import { pdebug } from "../utils/logger";

const store = createStore(
  combineReducers({
    nir,
    meta,
  })
);
const next = store.dispatch;
store.dispatch = function dispatchAndLog(action) {
  pdebug("Action: %o", action);
  const result = next(action);
  pdebug("Next State: %o", store.getState());
  return result;
};
const dispatch = store.dispatch;
export { store, dispatch };
