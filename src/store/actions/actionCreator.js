// import axios from "axios";
import { getIsAuthUser, getMovies } from "../../apiMovies";

const SET_USER_LOG_IN = "USER_LOGIN_IN";
const SET_USER_LOG_OUT = "USER_LOGIN_OUT";
//
const SET_TRENDING_MOVIE_LIST = "SET_TRENDING_MOVIE_LIST";
const SET_TRENDING_MOVIE_LIST_PAGE = "SET_TRENDING_MOVIE_LIST_PAGE";
//
const GET_SEARCHED_MOVIE_LIST = "GET_SEARCHED_MOVIE_LIST";
const SET_SEARCHED_MOVIE_LIST_PAGE = "SET_SEARCHED_MOVIE_LIST_PAGE";
//
//
//
//
const initialState = {
  user: {
    auth: false,
    userLogin: null,
    isAuth: getIsAuthUser(),
  },
  trendingMovie: {
    trendingCurrentPage: 1,
    trendingMovieList: [],
    total_result: 0,
  },
  searchedMovie: {
    searchedCurrentPage: 1,
    searchedMovieList: [],
    total_result: 0,
  },
};
//
//
//
// Reducer
const appDbReducer = (state = initialState, { type, payload }) => {
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
    case SET_TRENDING_MOVIE_LIST:
      return {
        ...state,
        trendingMovie: {
          ...state.trendingMovie,
          trendingMovieList: payload.results,
          total_result: payload.total_results,
        },
      };
    case SET_TRENDING_MOVIE_LIST_PAGE:
      return {
        ...state,
        trendingMovie: {
          ...state.trendingMovie,
          trendingCurrentPage: payload,
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
    case SET_SEARCHED_MOVIE_LIST_PAGE:
      return {
        ...state,
        searchedMovie: {
          ...state.searchedMovie,
          searchedCurrentPage: payload,
        },
      };

    default:
      return state;
  }
};
export default appDbReducer;
//
//
//
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
export const setTrendingMovieList = (payload) => {
  return (dispatch) => {
    dispatch({
      type: SET_TRENDING_MOVIE_LIST,
      payload,
    });
  };
};

export const setTrendingMovieListPage = (payload) => {
  return (dispatch) => {
    dispatch({
      type: SET_TRENDING_MOVIE_LIST_PAGE,
      payload,
    });
  };
};
export const getSearchedMovieList = (payload) => {
  return (dispatch) => {
    dispatch({
      type: GET_SEARCHED_MOVIE_LIST,
      payload,
    });
  };
};
export const setSearchedMovieListPage = (payload) => {
  return (dispatch) => {
    dispatch({
      type: SET_SEARCHED_MOVIE_LIST_PAGE,
      payload,
    });
  };
};
//
//
//
// Side effects
//
export const setCurrentTrendingMovieList = () => {
  return (dispath, getState) => {
    const { trendingCurrentPage, trendingMovieList } =
      getState().appDB.trendingMovie;

    getMovies(trendingCurrentPage).then(({ data }) => {
      data.results = trendingMovieList.concat(data.results);
      dispath(setTrendingMovieList(data));
    });
  };
};
