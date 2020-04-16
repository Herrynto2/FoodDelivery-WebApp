import {
  USER_LOGIN,
  USER_LOGOUT,
  GET_ADMIN_PROFILE,
  GET_USER_PROFILE,
} from "../action/types";

const initialState = {
  token: "",
  data_user: {},
  data_updated: {},
  data_admin: {},
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        token: action.payload,
      };
    case USER_LOGOUT:
      return {
        initialState,
      };
    case GET_USER_PROFILE:
      return {
        ...state,
        data_user: action.payload,
        data_updated: action.payloads,
      };
    case GET_ADMIN_PROFILE:
      return {
        ...state,
        data_admin: action.payload,
      };
    default:
      return state;
  }
}
