import { getMovieById } from "../../utils/helpers";
import axios from "axios";

export const GET_MOVIE_CARD = "GET_MOVIE_CARD";
export const GET_MOVIE_DATA_BASE = "GET_MOVIE_DATA_BASE";

const initialState = {
  movieDB: [],
  movieCard: [],
};

//reducer
const movieDBReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_MOVIE_DATA_BASE:
      return {
        ...state,
        movieDB: payload,
      };

    case GET_MOVIE_CARD:
      return {
        ...state,
        movieCard: payload,
      };

    default:
      return state;
  }
};
export default movieDBReducer;

//action creators

export const movieDataBase = (payload) => {
  // const fetchMovie = () => {
  //   const getMovies = await (page) => {
  //     axios.get(
  //       `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`
  //     );}
};

// return (dispatch) => {
//   dispatch({
//     type: GET_MOVIE_DATA_BASE,
//     payload: fetchMovie(getMovies(payload)),
//   });
// };
//};

export const movieCardDetail = (payload) => {
  return (dispatch) => {
    dispatch({
      type: GET_MOVIE_CARD,
      payload,
    });
  };
};
