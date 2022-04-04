const initial = {
    user: {},
    logout: false,
    ldaps: [],
    components: [],
    jobs: [],
    jobCount: 0,
    page: 0,
    size: 10,
    initialLoad: true,
  };
  
  export const SET_LDAPS = "nir/SET_LDAPS";
  export const SET_USER_AUTH_INFO = "nir/SET_USER_AUTH_INFO";
  export const SET_USER_COMPONENTS = "nir/SET_USER_COMPONENTS";
  export const SET_JOBS = "nir/SET_JOBS";
  export const SET_JOB_COUNT = "nir/SET_JOB_COUNT";
  export const SET_STATE_TO_INITIAL = "nir/SET_STATE_TO_INITIAL";
  export const SET_LOGOUT = "nir/SET_LOGOUT";
  
  export default function auth(state = initial, action) {
    switch (action.type) {
      case SET_USER_AUTH_INFO:
        return {
          ...state,
          user: action.payload,
        };
      case SET_LDAPS:
        return {
          ...state,
          ldaps: action.payload,
        };
      case SET_USER_COMPONENTS:
        return { ...state, components: action.payload };
      case SET_JOBS: {
        const filtered = {};
        []
          .concat(state.jobs)
          .concat(action.jobs)
          .forEach((element) => {
            filtered[element.id] = element;
          });
        return {
          ...state,
          jobs: Object.values(filtered).sort((a, b) => b.id - a.id),
          page: action.page,
        };
      }
      case SET_JOB_COUNT:
        return {
          ...state,
          jobCount: action.jobCount,
        };
      case SET_LOGOUT:
        return {
          ...state,
          logout: action.payload,
        };
      case SET_STATE_TO_INITIAL:
        return initial;
      default:
        return state;
    }
  }
  