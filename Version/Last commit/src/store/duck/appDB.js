const SET_USER_LOG_IN = "USER_LOGIN_IN";
const SET_USER_LOG_OUT = "USER_LOGIN_OUT";
const GET_TRENDING_MOVIE_LIST = "GET_TRENDING_MOVIE_LIST";
const GET_SEARCHED_MOVIE_LIST = "GET_SEARCHED_MOVIE_LIST";
//
//
//
//
const initialState = {
  user: {
    isAuth: false,
    userLogin: null,
  },
  trendingMovie: {
    trendingMovieList: [],
    total_result: 0,
  },
  searchedMovie: {
    searchedMovieList: [],
    total_result: 0,
  },
};
//
//
//
//
//Reducer
const appDB = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USER_LOG_IN:
      return {
        ...state,
        user: {
          isAuth: true,
          userLogin: payload.login,
        },
      };
    case SET_USER_LOG_OUT:
      return {
        ...state,
        user: {
          isAuth: false,
          userLogin: null,
        },
      };
    case GET_TRENDING_MOVIE_LIST:
      return {
        ...state,
        trendingMovie: {
          trendingMovieList: payload.results,
          total_result: payload.total_results,
        },
      };
    case GET_SEARCHED_MOVIE_LIST:
      return {
        ...state,
        searchedMovie: {
          searchedMovieList: payload.results,
          total_result: payload.total_results,
        },
      };
    default:
      return state;
  }
};
export default appDB;
//
//
//
//
//action creators
export const setUserLogIn = (payload) => ({
  type: SET_USER_LOG_IN,
  payload,
});
export const setUserLogOut = () => ({
  type: SET_USER_LOG_OUT,
});
export const getTrendingMovieList = (payload) => ({
  type: GET_TRENDING_MOVIE_LIST,
  payload,
});
export const getSearchedMovieList = (payload) => ({
  type: GET_SEARCHED_MOVIE_LIST,
  payload,
});
//
//
//
//
//side effects
