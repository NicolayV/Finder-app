import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { SingleContent } from "../../components/contentCard/index";
import { Header } from "../../components/ui/header";
import { Container } from "@material-ui/core";
import { useStyles } from "./style";
import { isAuthUser } from "../../apiMovies";
import debounce from "lodash.debounce";
import InfiniteScroll from "react-infinite-scroll-component";
import { MovieDrawer } from "../../components/movieDrawer";
import {
  setSearchText,
  setSearchedMovieListPage,
  setSearchedMovie,
} from "../../ducks/movie";
import { authLogOut } from "../../ducks/auth";

export const SearchPage = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  let history = useHistory();

  const { searchedCurrentPage, searchedMovieList } = useSelector(
    (state) => state.movie.searchedMovie
  );
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(setSearchedMovie());
  }, [dispatch, searchedCurrentPage]);

  const [toggle, setToggle] = useState(false);

  const handlerAuthLogOut = () => {
    isAuthUser(false);
    dispatch(authLogOut());
    return setTimeout(() => history.push("/"), 500);
  };

  const handlerSearch = debounce((searchText) => {
    dispatch(setSearchText(searchText));
  }, 1000);

  const handlerTest = () => {
    localStorage.removeItem("favoritesMovie");
  };
  const handlerMenuOpen = () => {
    setToggle(!toggle);
  };
  const handlerMenuClose = () => setToggle(!toggle);

  return (
    <>
      <Header
        loginName={user.userLogin || user.isAuth}
        handlerAuthLogOut={handlerAuthLogOut}
        handlerSearch={handlerSearch}
        handlerTest={handlerTest}
        handlerMenuOpen={handlerMenuOpen}
      />
      <MovieDrawer handlerMenuClose={handlerMenuClose} isOpen={toggle} />

      <Container className={classes.root}>
        <InfiniteScroll
          className={classes.root}
          dataLength={searchedMovieList.length}
          next={() =>
            dispatch(setSearchedMovieListPage(searchedCurrentPage + 1))
          }
          hasMore={true}
        >
          {searchedMovieList &&
            searchedMovieList.map(
              ({
                id,
                poster_path,
                title,
                name,
                release_date,
                first_air_date,
              }) => (
                <SingleContent
                  key={id}
                  id={id}
                  poster={poster_path}
                  title={title || name}
                  date={release_date || first_air_date}
                />
              )
            )}
        </InfiniteScroll>
      </Container>
    </>
  );
};
