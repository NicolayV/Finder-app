import {
  getMovies,
  getDetails,
  getSearchMovie,
  setFavoritesMovieLS,
} from "../apiMovies";

const SET_TRENDING_MOVIE_LIST = "SET_TRENDING_MOVIE_LIST";
const SET_TRENDING_MOVIE_LIST_PAGE = "SET_TRENDING_MOVIE_LIST_PAGE";
//
const SET_SEARCH_TEXT = "SET_SEARCH_TEXT";
const SET_SEARCHED_MOVIE_LIST = "SET_SEARCHED_MOVIE_LIST";
const SET_SEARCHED_MOVIE_LIST_PAGE = "SET_SEARCHED_MOVIE_LIST_PAGE";
//
const SET_MOVIE_DETAIL_BY_ID = "SET_MOVIE_DETAIL_BY_ID";
//
const SET_FAVORITES_MOVIE_BY_ID = "SET_FAVORITES_MOVIE_BY_ID";
//
//
const initialState = {
  trendingMovie: {
    trendingCurrentPage: 1,
    trendingMovieList: [],
    total_result: 0,
  },
  searchedMovie: {
    searchText: "",
    searchedCurrentPage: 1,
    searchedMovieList: [],
    total_result: 0,
  },
  currentMovieDetail: [],
  favoritesMovie: [],
};
//
//
// Reducer
const movie = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_TRENDING_MOVIE_LIST_PAGE:
      return {
        ...state,
        trendingMovie: {
          ...state.trendingMovie,
          trendingCurrentPage: payload,
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
    case SET_SEARCH_TEXT:
      return {
        ...state,
        searchedMovie: {
          ...state.searchedMovie,
          searchText: payload,
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
    case SET_SEARCHED_MOVIE_LIST:
      return {
        ...state,
        searchedMovie: {
          ...state.searchedMovie,
          searchedMovieList: payload.results,
          total_result: payload.total_results,
        },
      };
    case SET_MOVIE_DETAIL_BY_ID:
      return {
        ...state,
        currentMovieDetail: payload,
      };
    case SET_FAVORITES_MOVIE_BY_ID:
      return {
        ...state,
        favoritesMovie: payload,
      };
    default:
      return state;
  }
};
export default movie;
//
//
// Action Creator
export const setTrendingMovieListPage = (payload) => {
  return (dispatch) => {
    dispatch({
      type: SET_TRENDING_MOVIE_LIST_PAGE,
      payload,
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
export const setSearchText = (payload) => {
  return (dispatch) => {
    dispatch({
      type: SET_SEARCH_TEXT,
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
export const setSearchedMovieList = (payload) => {
  return (dispatch) => {
    dispatch({
      type: SET_SEARCHED_MOVIE_LIST,
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
export const setFavoritesMovieById = (payload) => {
  return (dispatch) => {
    dispatch({
      type: SET_FAVORITES_MOVIE_BY_ID,
      payload,
    });
  };
};
//
//
// Side effects
export const setCurrentTrendingMovieList = () => {
  return (dispath, getState) => {
    const { trendingCurrentPage, trendingMovieList } =
      getState().movie.trendingMovie;

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
export const setSearchedMovie = () => {
  return (dispath, getState) => {
    const { searchedCurrentPage, searchedMovieList, searchText } =
      getState().movie.searchedMovie;

    getSearchMovie(searchText, searchedCurrentPage).then(({ data }) => {
      data.results = searchedMovieList.concat(data.results);
      dispath(setSearchedMovieList(data));
    });
  };
};
//
//
export const setFavoritesMovie = (id) => {
  return (dispath, getState) => {
    const { favoritesMovie } = getState().movie;
    getDetails(id).then(({ data }) => {
      const repeatCheck = favoritesMovie.some((item) => item.id === id);
      if (!repeatCheck) {
        favoritesMovie.push(data);
        setFavoritesMovieLS(favoritesMovie);
        dispath(setFavoritesMovieById(favoritesMovie));
      } else {
        const withoutFavMovie = favoritesMovie.filter((item) => item.id !== id);
        setFavoritesMovieLS(withoutFavMovie);
        dispath(setFavoritesMovieById(withoutFavMovie));
      }
    });
  };
};
//
//
export const removeFavoriteMovie = (id) => {
  return (dispath, getState) => {
    const { favoritesMovie } = getState().movie;
    const withoutFavMovie = favoritesMovie.filter((item) => item.id !== id);
    setFavoritesMovieLS(withoutFavMovie);
    dispath(setFavoritesMovieById(withoutFavMovie));
  };
};
//
//
