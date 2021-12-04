import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PureSingleContent, SingleContent } from "../../components/contentCard";
import { Container } from "@material-ui/core";
import { useStyles } from "./style";
import { getFavoritesMovieLS } from "../../utils/storage";
import {
  setFavoritesMovieById,
  setCurrentTrendingMovieList,
} from "../../ducks/movie";
import { UnendingScrollM } from "../../components/ui/unendingScroll";

export const Favorite = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { favoritesMovie, trendingCurrentPage } = useSelector(
    (state) => state.movie
  );
  useEffect(() => {
    dispatch(setCurrentTrendingMovieList());
  }, [dispatch, trendingCurrentPage]);

  useEffect(() => {
    const storageMovies = getFavoritesMovieLS();
    dispatch(setFavoritesMovieById(storageMovies));
  }, [dispatch]);

  return (
    <Container className={classes.root}>
      <UnendingScrollM>
        {favoritesMovie &&
          favoritesMovie.map(
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
      </UnendingScrollM>
    </Container>
  );
};
