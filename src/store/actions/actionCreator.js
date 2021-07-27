// import axios from "axios";
import {
  getIsAuthUser,
  getMovies,
  getDetails,
  getSearchMovie,
} from "../../apiMovies";

const SET_USER_LOG_IN = "USER_LOGIN_IN";
const SET_USER_LOG_OUT = "USER_LOGIN_OUT";
//
const SET_TRENDING_MOVIE_LIST = "SET_TRENDING_MOVIE_LIST";
const SET_TRENDING_MOVIE_LIST_PAGE = "SET_TRENDING_MOVIE_LIST_PAGE";
//
const SET_SEARCHED_MOVIE_LIST = "SET_SEARCHED_MOVIE_LIST";
const SET_SEARCHED_MOVIE_LIST_PAGE = "SET_SEARCHED_MOVIE_LIST_PAGE";
//
const SET_MOVIE_DETAIL_BY_ID = "SET_MOVIE_DETAIL_BY_ID";
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
  currentMovieDetail: [],
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
    case SET_SEARCHED_MOVIE_LIST:
      return {
        ...state,
        searchedMovie: {
          ...state.searchedMovie,
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
    case SET_MOVIE_DETAIL_BY_ID:
      return {
        ...state,
        currentMovieDetail: payload,
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
export const setSearchedMovieList = (payload) => {
  return (dispatch) => {
    dispatch({
      type: SET_SEARCHED_MOVIE_LIST,
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
export const setMovieDetailById = (payload) => {
  return (dispatch) => {
    dispatch({
      type: SET_MOVIE_DETAIL_BY_ID,
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
//
//
export const getMovieDetailById = (id) => {
  return (dispath) => {
    getDetails(id).then(({ data }) => {
      dispath(setMovieDetailById(data));
    });
  };
};
//
//
export const getSearchedMovieList = (searchText) => {
  return (dispath, getState) => {
    const { searchedCurrentPage, searchedMovieList } =
      getState().appDB.searchedMovie;

    getSearchMovie(searchText, searchedCurrentPage).then(({ data }) => {
      data.results = searchedMovieList.concat(data.results);
      dispath(setSearchedMovieList(data));
    });
  };
};
