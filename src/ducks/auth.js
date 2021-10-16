// import { useHistory } from "react-router";
import { getIsAuthUser } from "../utils/storage";

const SET_USER_LOG_IN = "SET_USER_LOGIN_IN";
const SET_USER_LOG_OUT = "SET_USER_LOGIN_OUT";
// const IS_AUTH_USER = "IS_AUTH_USER";

const initialState = {
  userAuth: false,
  userLogin: null,
  isAuth: getIsAuthUser(),
};

//  Reducer
const auth = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USER_LOG_IN:
      return {
        ...state,
        userAuth: true,
        userLogin: payload.login,
        //isAuth: payload.user,
        isAuth: getIsAuthUser(),
      };
    case SET_USER_LOG_OUT:
      return {
        ...state,
        userAuth: false,
        userLogin: null,
        // isAuth: null,
        isAuth: getIsAuthUser(),
      };
    // case IS_AUTH_USER:
    //   return {
    //     ...state,
    //     userAuth: false,
    //     userLogin: payload.user,
    //     isAuth: payload.user,
    //   };
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

// Side effects
// export const setIsAuth = (payload) => {
//   return (dispatch) => {
//     const user = getIsAuthUser();
//     dispatch({
//       type: IS_AUTH_USER,
//       payload: user,
//     });
//   };
// };
