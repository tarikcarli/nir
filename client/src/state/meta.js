import { dispatch } from "./store";

/**
 *@typedef {{
 *  defaultGeoserver:any
 *  pendingRequestCount:number,
 *  disableMessageDuration:number,
 *  disableMessage:object,
 *  message:{content:string,level:"error"|"warm"|"success"}}} MetaState
 *@type {MetaState}
 */
export const initial = {
  defaultGeoserver: null,
  pendingRequestCount: 0,
  disableMessageDuration: 3000,
  disableMessage: {},
  message: { content: "", level: "error" },
};

export const INCREMENT_PRC = "meta/INCREMENT_PRC";
export const DECREMENT_PRC = "meta/DECREMENT_PRC";
export const SET_DISABLE_MESSAGE = "meta/SET_DISABLE_MESSAGE";
export const SET_DISABLE_MESSAGE_DURATION = "meta/SET_DISABLE_MESSAGE_DURATION";
export const SET_DEFAULT_GEOSERVER = "meta/SET_DEFAULT_GEOSERVER";
const SET_MESSAGE = "meta/SET_ERROR_MESSAGE";

/**@type {(state:MetaState,action:{type:string,payload:any}) => MetaState}  */
export default function reducer(state = initial, action) {
  const { type, payload } = action;
  switch (type) {
    case INCREMENT_PRC:
      return { ...state, pendingRequestCount: state.pendingRequestCount + 1 };
    case DECREMENT_PRC:
      return { ...state, pendingRequestCount: state.pendingRequestCount - 1 };
    case SET_MESSAGE:
      return { ...state, message: payload };
    case SET_DISABLE_MESSAGE:
      return { ...state, disableMessage: {} };
    case SET_DISABLE_MESSAGE_DURATION:
      return { ...state, disableMessageDuration: payload };
    case SET_DEFAULT_GEOSERVER:
      return { ...state, defaultGeoserver: payload };
    default:
      return state;
  }
}

/** @type {(content:string,level?:"error"|"info"|"success") => void} */
export function setMsg(content, level = "error") {
  dispatch({ type: SET_MESSAGE, payload: { content, level } });
}
