import { AUTH_LOGOUT, AUTH_SUCCES } from "../actions/actionTypes";
import { getIsAuthUser } from "../../apiMovies";

const initialState = {
  auth: false,
  userLogin: null,
  isAuth: getIsAuthUser(),
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTH_SUCCES:
      return {
        ...state,
        auth: true,
        userLogin: payload.login,
        isAuth: getIsAuthUser(),
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        auth: false,
        userLogin: null,
        isAuth: getIsAuthUser(),
      };
    default:
      return state;
  }
};

export default authReducer;
