import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SingleContent } from "../../components/contentCard";
import { Container } from "@material-ui/core";
import { UnendingScrollM } from "../../components/ui/unendingScroll";
import { useStyles } from "./style";
import { getFavoritesMovieLS, getIsAuthUser } from "../../utils/storage";
import {
  setFavoritesMovieById,
  setCurrentTrendingMovieList,
} from "../../ducks/movie";
import { authSucces } from "../../ducks/auth";

export const Movies = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    const isAuth = getIsAuthUser();
    console.log(isAuth);
    if (isAuth) {
      dispatch(authSucces({ isAuth }));
    }
  }, []);

  const { trendingCurrentPage, trendingMovieList } = useSelector(
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
              <SingleContent
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
