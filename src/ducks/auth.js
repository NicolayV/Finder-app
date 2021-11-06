const SET_USER_LOG_IN = "SET_USER_LOGIN_IN";
const SET_USER_LOG_OUT = "SET_USER_LOGIN_OUT";

const initialState = {
  userLogin: null,
  loggedIn: false,
};

//  Reducer
const auth = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USER_LOG_IN:
      return {
        ...state,
        userLogin: payload,
        loggedIn: true,
      };
    case SET_USER_LOG_OUT:
      return {
        ...state,
        userLogin: null,
        loggedIn: false,
      };
    default:
      return state;
  }
};
export default auth;

// Action Creator
export const authLogIn = (payload) => {
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
