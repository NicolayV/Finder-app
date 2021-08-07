import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../store/actions/allActionCreators";
import { useHistory } from "react-router-dom";
import { SingleContent } from "../components/contentCard";
import { Header } from "../components/ui/header";
import { Container } from "@material-ui/core";
import { useStyles } from "./searchPage/style";
import { getFavoritesMovieLS, isAuthUser } from "../apiMovies";
import debounce from "lodash.debounce";
import InfiniteScroll from "react-infinite-scroll-component";
import { MovieDrawer } from "../components/movieDrawer";

export const Movies = () => {
  const classes = useStyles();
  let history = useHistory();

  const { user, trendingMovie, searchedMovie } = useSelector(
    (state) => state.appDB
  );
  const dispatch = useDispatch();
  const {
    authLogOut,
    setTrendingMovieListPage,
    setCurrentTrendingMovieList,
    setSearchText,
    setFavoritesMovieById,
  } = bindActionCreators(actionCreators, dispatch);
  useEffect(
    () => {
      setCurrentTrendingMovieList();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [trendingMovie.trendingCurrentPage]
  );
  useEffect(() => setFavoritesMovieById(getFavoritesMovieLS()), []);
  const [toggle, setToggle] = useState(false);

  const handlerAuthLogOut = () => {
    isAuthUser(false);
    authLogOut();
    return setTimeout(() => history.push("/"), 500);
  };

  const handlerSearch = debounce((searchText) => {
    setSearchText(searchText);
    history.push("/search");
  }, 1000);

  const handlerTest = () => {
    localStorage.removeItem("favoritesMovie");
  };
  const handlerMenuOpen = () => {
    setToggle(!toggle);
    console.log("toggle: ", toggle);
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
          dataLength={trendingMovie.trendingMovieList.length}
          next={() =>
            setTrendingMovieListPage(trendingMovie.trendingCurrentPage + 1)
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
