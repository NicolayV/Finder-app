import { getMovies, getDetails, getSearchMovie } from "../apiMovies";
import { setFavoritesMovieLS } from "../utils/storage";

const SET_TRENDING_MOVIE_LIST = "SET_TRENDING_MOVIE_LIST";
const SET_TRENDING_MOVIE_LIST_PAGE = "SET_TRENDING_MOVIE_LIST_PAGE";
const SET_TRENDING_MOVIE_INIT = "SET_TRENDING_MOVIE_INIT";

const SET_SEARCH_TEXT = "SET_SEARCH_TEXT";
const SET_SEARCH_MOVIE_INIT = "SET_SEARCH_MOVIE_INIT";
const SET_SEARCHED_MOVIE_LIST = "SET_SEARCHED_MOVIE_LIST";
const SET_SEARCHED_MOVIE_LIST_PAGE = "SET_SEARCHED_MOVIE_LIST_PAGE";

const SET_MOVIE_DETAIL_BY_ID = "SET_MOVIE_DETAIL_BY_ID";

const SET_FAVORITES_MOVIE_BY_ID = "SET_FAVORITES_MOVIE_BY_ID";

const initialState = {
  trendingCurrentPage: 1,
  trendingMovieList: [],
  trending_total_result: 0,

  searchText: "",
  searchedCurrentPage: 1,
  searchedMovieList: [],
  searched_total_result: 0,
  currentMovieDetail: [],
  favoritesMovie: [],
};

// Reducer
const movie = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_TRENDING_MOVIE_LIST_PAGE:
      return {
        ...state,
        trendingCurrentPage: payload,
      };
    case SET_TRENDING_MOVIE_LIST:
      return {
        ...state,
        trendingMovieList: payload.results,
        trending_total_result: payload.total_results,
      };
    case SET_TRENDING_MOVIE_INIT:
      return {
        ...state,
        trendingCurrentPage: 1,
        trendingMovieList: [],
        trending_total_result: 0,
      };

    case SET_SEARCH_MOVIE_INIT:
      return {
        ...state,
        searchText: "",
        searchedCurrentPage: 1,
        searchedMovieList: [],
        search_total_result: 0,
      };

    case SET_SEARCH_TEXT:
      return {
        ...state,
        searchText: payload,
      };

    case SET_SEARCHED_MOVIE_LIST_PAGE:
      return {
        ...state,
        searchedCurrentPage: payload,
      };
    case SET_SEARCHED_MOVIE_LIST:
      return {
        ...state,
        searchedMovieList: payload.results,
        search_total_result: payload.total_results,
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

// Action Creator
export const setTrendingMovieListPage = (payload) => ({
  type: SET_TRENDING_MOVIE_LIST_PAGE,
  payload,
});
export const setTrendingMovieList = (payload) => ({
  type: SET_TRENDING_MOVIE_LIST,
  payload,
});
export const setTrendingMovieInit = () => ({
  type: SET_TRENDING_MOVIE_INIT,
});

export const setSearchInit = () => ({
  type: SET_SEARCH_MOVIE_INIT,
});
export const setSearchText = (payload) => ({
  type: SET_SEARCH_TEXT,
  payload,
});
export const setSearchedMovieListPage = (payload) => ({
  type: SET_SEARCHED_MOVIE_LIST_PAGE,
  payload,
});
export const setSearchedMovieList = (payload) => ({
  type: SET_SEARCHED_MOVIE_LIST,
  payload,
});

export const setMovieDetailById = (payload) => ({
  type: SET_MOVIE_DETAIL_BY_ID,
  payload,
});

export const setFavoritesMovieById = (payload) => ({
  type: SET_FAVORITES_MOVIE_BY_ID,
  payload,
});

// Side effects
// export const setCurrentTrendingMovieList = () => {
//   return (dispatch, getState) => {
//     const { trendingCurrentPage, trendingMovieList } = getState().movie;

//     getMovies(trendingCurrentPage).then(({ data }) => {
//       data.results = [...trendingMovieList, ...data.results];
//       dispatch(setTrendingMovieList(data));
//     });
//   };
// };
export const setCurrentTrendingMovieList = () => {
  return (dispatch, getState) => {
    const { trendingCurrentPage, trendingMovieList } = getState().movie;

    getMovies(trendingCurrentPage).then(({ data }) => {
      console.log("Data", data.results);
      console.log("trendingCurrentPage", trendingCurrentPage);
      console.log("Data index", data.results[2].id);

      // const currentArray = data.results

      data.results = [...trendingMovieList, ...data.results];

      // let arr = trendingMovieList.includes(...data.results);
      // if (arr) {
      //   data.results = [...trendingMovieList];
      // }
      // let arr = [...trendingMovieList, ...data.results].reduce(
      //   (unique, item) => (unique.includes(item) ? unique : [...unique, item]), []);
      const arry = [...new Set(data.results)];
      // const array3 = [...trendingMovieList, ...data.results];
      // const array4 = array3.filter((item, index) => {array3.indexOf(item) == index});

      console.log("Data spred", data.results);
      console.log("Data spred witout duble", arry);
      dispatch(setTrendingMovieList(data));
    });
  };
};

export const setSearchedMovie = (props) => {
  return (dispatch, getState) => {
    dispatch(setSearchText(props));
    const { searchedCurrentPage, searchedMovieList, searchText } =
      getState().movie;

    getSearchMovie(searchText, searchedCurrentPage).then(({ data }) => {
      data.results = [...searchedMovieList, ...data.results];
      dispatch(setSearchedMovieList(data));
    });
  };
};

export const getMovieDetailById = (id) => {
  return (dispatch) => {
    getDetails(id).then(({ data }) => {
      dispatch(setMovieDetailById(data));
    });
  };
};

export const setFavoritesMovie = (id) => {
  return (dispatch, getState) => {
    const { favoritesMovie } = getState().movie;
    getDetails(id).then(({ data }) => {
      const repeatCheck = favoritesMovie.some((item) => item.id === id);
      if (!repeatCheck) {
        favoritesMovie.push(data);
        setFavoritesMovieLS(favoritesMovie);
        dispatch(setFavoritesMovieById(favoritesMovie));
      } else {
        const withoutFavMovie = favoritesMovie.filter((item) => item.id !== id);
        setFavoritesMovieLS(withoutFavMovie);
        dispatch(setFavoritesMovieById(withoutFavMovie));
      }
    });
  };
};
