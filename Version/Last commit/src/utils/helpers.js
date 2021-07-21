import axios from "axios";

// delay Search
export const delay = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

//MovieDataBase
export const getMovieById = (id) =>
  axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&external_source=imdb_id`
  );
