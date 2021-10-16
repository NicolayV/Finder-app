// LocalStorage
export const getUsersLS = () => JSON.parse(localStorage.getItem("users")) || [];

export const getLoggedUserLS = () =>
  JSON.parse(localStorage.getItem("isAuthUser"));

export const setLoggedUserLS = (props) =>
  localStorage.setItem("isAuthUser", JSON.stringify(props));

// Favorite movie
export const getFavoritesMovieLS = () =>
  JSON.parse(localStorage.getItem("favoritesMovie")) || [];
export const setFavoritesMovieLS = (props) =>
  localStorage.setItem("favoritesMovie", JSON.stringify(props));
