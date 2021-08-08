import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SingleContent } from "../../components/contentCard";
import { Header } from "../../components/ui/header";
import { Container } from "@material-ui/core";
import { useStyles } from "./style";
import { getFavoritesMovieLS } from "../../apiMovies";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  setFavoritesMovieById,
  setCurrentTrendingMovieList,
  setTrendingMovieListPage,
} from "../../ducks/movie";

export const Movies = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { trendingMovie } = useSelector((state) => state.movie);

  useEffect(() => {
    dispatch(setCurrentTrendingMovieList());
  }, [dispatch, trendingMovie.trendingCurrentPage]);
  useEffect(() => {
    const storageMovies = getFavoritesMovieLS();
    dispatch(setFavoritesMovieById(storageMovies));
  }, [dispatch]);

  console.log("render");
  return (
    <>
      <Header />
      {/* <MovieDrawer handlerMenuClose={handlerMenuClose} isOpen={toggle} /> */}
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
