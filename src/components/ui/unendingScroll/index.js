import React from "react";
import { useStyles } from "./style";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import {
  setTrendingMovieListPage,
  setSearchedMovieListPage,
} from "../../../ducks/movie";

// InfiniteScroll for mainPage
export const UnendingScrollM = ({ children }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { trendingMovieList, trendingCurrentPage } = useSelector(
    (state) => state.movie
  );

  return (
    <InfiniteScroll
      className={classes.root}
      dataLength={trendingMovieList.length}
      next={() => dispatch(setTrendingMovieListPage(trendingCurrentPage + 1))}
      hasMore={true}
    >
      {children}
    </InfiniteScroll>
  );
};

// InfiniteScroll for Search
export const UnendingScrollS = ({ children }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { searchedCurrentPage, searchedMovieList } = useSelector(
    (state) => state.movie
  );

  return (
    <InfiniteScroll
      className={classes.root}
      dataLength={searchedMovieList.length}
      next={() => dispatch(setSearchedMovieListPage(searchedCurrentPage + 1))}
      hasMore={true}
    >
      {children}
    </InfiniteScroll>
  );
};
