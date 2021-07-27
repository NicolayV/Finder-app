import axios from "axios";
//
//
//
// LocalStorage
export const getUsers = () => JSON.parse(localStorage.getItem("users")) || [];

export const getIsAuthUser = () =>
  JSON.parse(localStorage.getItem("isAuthUser"));

export const isAuthUser = (props) => {
  localStorage.setItem("isAuthUser", JSON.stringify(props));
};
//
//
//
// MovieDataBase
export const getMovies = (page) =>
  axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`
  );

export const getDetails = (id) =>
  axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&external_source=imdb_id`
  );

export const getSearchMovie = (searchText, page) =>
  axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${searchText}&page=${page}`
  );
