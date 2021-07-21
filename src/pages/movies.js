import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../store/actions/allActionCreators";

import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import { SingleContent } from "../components/contentCard";
import { Header } from "../components/ui/header";
import { Container } from "@material-ui/core";
import { useStyles } from "./style";
import { getMovies, isAuthUser } from "../apiMovies";

import debounce from "lodash.debounce";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";

export const Movies = () => {
  const classes = useStyles();
  let history = useHistory();

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { authLogOut, setTrendingMovieListPage, setTrendingMovieList } =
    bindActionCreators(actionCreators, dispatch);

  const [content, setContent] = useState([]);
  const page = state.appDB.trendingMovie.trendingCurrentPage;

  const handlerAuthLogOut = () => {
    isAuthUser(false);
    authLogOut();
    return setTimeout(() => history.push("/"), 500);
  };

  const fetchSearh = async (searchText) => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${searchText}`
    );
    console.log(data.results.length);
    console.log(data);
    setContent(data.results);

    return data;
  };

  const handlerSearch = debounce((text) => fetchSearh(text), 1000);
  //
  //
  const handlerTest = () => setTrendingMovieList();
  //
  //
  useEffect(() => {
    const fetchTrending = async () => {
      const { data } = await getMovies(page);
      setContent(content.concat(Array.from(data.results)));
    };
    fetchTrending();

    // setTrendingMovieList();
    // setContent(
    //   content.concat(Array.from(state.appDB.trendingMovie.trendingMovieList))
    // );
  }, [page]);

  const handlerSetPage = () => {
    // setPage(page + 1);
    setTrendingMovieListPage(page + 1);
  };

  return (
    <>
      <Header
        loginName={state.appDB.user.userLogin || state.appDB.user.isAuth}
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
