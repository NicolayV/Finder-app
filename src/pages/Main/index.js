import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PureSingleContent, SingleContent } from "../../components/contentCard";
import { Container } from "@material-ui/core";
import { UnendingScrollM } from "../../components/ui/unendingScroll";
import { useStyles } from "./style";
import { getFavoritesMovieLS, getLoggedUserLS } from "../../utils/storage";
import {
  setFavoritesMovieById,
  setCurrentTrendingMovieList,
  setTrendingMovieListPage,
  setTrendingMovieInit,
} from "../../ducks/movie";
import { authLogIn } from "../../ducks/auth";
import InfiniteScroll from "react-infinite-scroll-component";

export const Movies = () => {
  console.log("mainrender");
  const classes = useStyles();
  const dispatch = useDispatch();
  const loggedIn = useCallback(
    useSelector((state) => state.auth.loggedIn),
    []
  );
  useEffect(() => {
    console.log("useEffect loggedUserLS");
    const loggedUserLS = getLoggedUserLS();
    if (loggedUserLS && !loggedIn) {
      dispatch(authLogIn(loggedUserLS));
    }
  }, [loggedIn]);
  useEffect(() => {
    console.log("useEffect favorite");
    const storageMovies = getFavoritesMovieLS();
    dispatch(setFavoritesMovieById(storageMovies));
  }, [dispatch]);

  const { trendingCurrentPage, trendingMovieList } = useSelector(
    (state) => state.movie
  );

  useEffect(() => {
    console.log("useEffect trendingMovieList", trendingCurrentPage);
    dispatch(setCurrentTrendingMovieList());
  }, [trendingCurrentPage]);

  const nextScrollPageHandler = () => {
    dispatch(setTrendingMovieListPage(trendingCurrentPage + 1));
  };

  return (
    <Container className={classes.root}>
      {/* <UnendingScrollM> */}
      <InfiniteScroll
        className={classes.root}
        dataLength={trendingMovieList.length}
        next={nextScrollPageHandler}
        hasMore={true}
      >
        {trendingMovieList &&
          trendingMovieList.map(
            ({
              id,
              poster_path,
              title,
              name,
              release_date,
              first_air_date,
            }) => (
              <PureSingleContent
                key={id}
                id={id}
                poster={poster_path}
                title={title || name}
                date={release_date || first_air_date}
              />
            )
          )}
        {/* </UnendingScrollM> */}
      </InfiniteScroll>
    </Container>
  );
};
