import { AUTH_LOGOUT, AUTH_SUCCES } from "./actionTypes";

export const authSucces = (payload) => {
  return (dispatch) => {
    dispatch({
      type: AUTH_SUCCES,
      // auth: true,
      payload,
    });
  };
};

export const authLogOut = () => {
  return (dispatch) => {
    dispatch({
      type: AUTH_LOGOUT,
      // auth: false,
      // userLogin: null,
    });
  };
};
