import { getIsAuthUser } from "../utils/storage";

const SET_USER_LOG_IN = "USER_LOGIN_IN";
const SET_USER_LOG_OUT = "USER_LOGIN_OUT";

const initialState = {
  user: {
    auth: false,
    userLogin: null,
    isAuth: getIsAuthUser(),
  },
};

//  Reducer
const auth = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USER_LOG_IN:
      return {
        ...state,
        user: {
          auth: true,
          userLogin: payload.login,
          isAuth: getIsAuthUser(),
        },
      };
    case SET_USER_LOG_OUT:
      return {
        ...state,
        user: {
          auth: false,
          userLogin: null,
          isAuth: getIsAuthUser(),
        },
      };
    default:
      return state;
  }
};
export default auth;

// Action Creator
export const authSucces = (payload) => {
  return (dispatch) => {
    dispatch({
      type: SET_USER_LOG_IN,
      payload,
    });
  };
};
export const authLogOut = () => {
  return (dispatch) => {
    dispatch({
      type: SET_USER_LOG_OUT,
    });
  };
};
