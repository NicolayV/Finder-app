import axios from "axios";

export const getUsers = () => JSON.parse(localStorage.getItem("users")) || [];

export const getIsAuthUser = () =>
  JSON.parse(localStorage.getItem("isAuthUser"));

export const isAuthUser = (props) =>
  localStorage.setItem("isAuthUser", JSON.stringify(props));

export const getMovies = (page) =>
  axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`
  );

// trending movies!!!!!
//     `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_API_KEY}`

// get movie popular with pages
// https://api.themoviedb.org/3/movie/popular?api_key=456706c5ed772add1a7208f87e3114b9&language=en-US&page=1
