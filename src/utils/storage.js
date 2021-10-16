// LocalStorage
export const getUsers = () => JSON.parse(localStorage.getItem("users")) || [];
export const getIsAuthUser = () =>
  JSON.parse(localStorage.getItem("isAuthUser"));
export const setIsAuth = (props) =>
  localStorage.setItem("isAuthUser", JSON.stringify(props));

// Favorite movie
export const getFavoritesMovieLS = () =>
  JSON.parse(localStorage.getItem("favoritesMovie")) || [];
export const setFavoritesMovieLS = (props) =>
  localStorage.setItem("favoritesMovie", JSON.stringify(props));
