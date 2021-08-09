import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SingleContent } from "../../components/contentCard/index";
import { Header } from "../../components/ui/header";
import { Container } from "@material-ui/core";
import { UnendingScrollS } from "../../components/ui/unendingScroll";
import { useStyles } from "./style";
import { setSearchedMovie } from "../../ducks/movie";

export const SearchPage = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const { searchedCurrentPage, searchedMovieList } = useSelector(
    (state) => state.movie.searchedMovie
  );

  useEffect(() => {
    dispatch(setSearchedMovie());
  }, [dispatch, searchedCurrentPage]);

  return (
    <>
      <Header />
      <Container className={classes.root}>
        <UnendingScrollS>
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
        </UnendingScrollS>
      </Container>
    </>
  );
};
