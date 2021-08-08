import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { SingleContent } from "../../components/contentCard";
import { Header } from "../../components/ui/header";
import { Container } from "@material-ui/core";
import { useStyles } from "./style";
import { getFavoritesMovieLS, isAuthUser } from "../../apiMovies";
import debounce from "lodash.debounce";
import InfiniteScroll from "react-infinite-scroll-component";
import { MovieDrawer } from "../../components/movieDrawer";
import {
  setFavoritesMovieById,
  setCurrentTrendingMovieList,
  setTrendingMovieListPage,
  setSearchText,
} from "../../ducks/movie";
import { authLogOut } from "../../ducks/auth";

export const Movies = () => {
  const classes = useStyles();
  let history = useHistory();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { trendingMovie } = useSelector((state) => state.movie);

  useEffect(() => {
    dispatch(setCurrentTrendingMovieList());
  }, [dispatch, trendingMovie.trendingCurrentPage]);
  console.log("render");
  useEffect(() => dispatch(setFavoritesMovieById(getFavoritesMovieLS())), []);

  const [toggle, setToggle] = useState(false);

  const handlerAuthLogOut = () => {
    isAuthUser(false);
    dispatch(authLogOut());
    return setTimeout(() => history.push("/"), 500);
  };

  const handlerSearch = debounce((searchText) => {
    dispatch(setSearchText(searchText));
    history.push("/search");
  }, 1000);

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
        handlerMenuOpen={handlerMenuOpen}
      />
      <MovieDrawer handlerMenuClose={handlerMenuClose} isOpen={toggle} />
      <Container className={classes.root}>
        <InfiniteScroll
          className={classes.root}
          dataLength={trendingMovie.trendingMovieList.length}
          next={() =>
            dispatch(
              setTrendingMovieListPage(trendingMovie.trendingCurrentPage + 1)
            )
          }
          hasMore={true}
        >
          {trendingMovie.trendingMovieList &&
            trendingMovie.trendingMovieList.map(
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
