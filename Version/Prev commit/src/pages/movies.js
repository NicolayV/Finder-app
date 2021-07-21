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
  const { authLogOut } = bindActionCreators(actionCreators, dispatch);

  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);

  const handleAuthLogOut = () => {
    isAuthUser(false);
    authLogOut();
    return setTimeout(() => history.push("/"), 500);
  };

  // const fetchSearh = async () => {
  //   await axios.get(
  //     `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1&include_adult=false`
  //   );
  //   console.log(fetchSearh);
  // };

  const handlerSearch = (e) => {
    const deb = debounce(() => {
      console.log(e.target.value);
      // fetchSearh();
    }, 1000);

    deb();
  };

  useEffect(() => {
    const fetchTrending = async () => {
      const { data } = await getMovies(page);
      setContent(content.concat(Array.from(data.results)));
    };
    fetchTrending();
  }, [page]);

  const handleSetPage = () => setPage(page + 1);

  return (
    <>
      <Header
        loginName={state.auth.userLogin}
        handleAuthLogOut={handleAuthLogOut}
        handlerSearch={handlerSearch}
      />

      <Container className={classes.root}>
        <InfiniteScroll
          className={classes.root}
          dataLength={content.length}
          next={handleSetPage}
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
