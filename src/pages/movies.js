import React, { useEffect } from "react";

import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../store/actions/allActionCreators";

import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import { SingleContent } from "../components/contentCard";
import { Header } from "../components/ui/header";
import { Container } from "@material-ui/core";
import { useStyles } from "./style";
import { isAuthUser } from "../apiMovies";

import debounce from "lodash.debounce";
import InfiniteScroll from "react-infinite-scroll-component";
// import axios from "axios";

export const Movies = () => {
  const classes = useStyles();
  let history = useHistory();

  const { user, trendingMovie } = useSelector((state) => state.appDB);
  const dispatch = useDispatch();
  const { authLogOut, setTrendingMovieListPage, setCurrentTrendingMovieList } =
    bindActionCreators(actionCreators, dispatch);
  useEffect(
    () => {
      setCurrentTrendingMovieList();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [trendingMovie.trendingCurrentPage]
  );

  let content = trendingMovie.trendingMovieList;
  const page = trendingMovie.trendingCurrentPage;

  const handlerAuthLogOut = () => {
    isAuthUser(false);
    authLogOut();
    return setTimeout(() => history.push("/"), 500);
  };

  // const fetchSearh = async (searchText) => {
  //   const { data } = await axios.get(
  //     `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${searchText}`
  //   );

  //   // setContent(data.results);

  //   return data;
  // };

  // const handlerSearch = debounce((text) => fetchSearh(text), 1000);
  const handlerSearch = debounce((text) => console.log(text), 1000);
  //
  const handlerTest = () => {
    setCurrentTrendingMovieList();
  };

  const handlerSetPage = () => {
    setTrendingMovieListPage(page + 1);
  };

  return (
    <>
      <Header
        loginName={user.userLogin || user.isAuth}
        handlerAuthLogOut={handlerAuthLogOut}
        handlerSearch={handlerSearch}
        handlerTest={handlerTest}
      />
      <Container className={classes.root}>
        <InfiniteScroll
          className={classes.root}
          dataLength={content.length}
          next={handlerSetPage}
          hasMore={true}
        >
          {content &&
            content.map(
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
