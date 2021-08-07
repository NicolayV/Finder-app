import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../store/actions/allActionCreators";
import { useHistory } from "react-router-dom";
import { SingleContent } from "../../components/contentCard/index";
import { Header } from "../../components/ui/header";
import { Container } from "@material-ui/core";
import { useStyles } from "./style";
import { isAuthUser } from "../../apiMovies";
// import debounce from "lodash.debounce";
import InfiniteScroll from "react-infinite-scroll-component";

export const SearchPage = () => {
  const classes = useStyles();
  let history = useHistory();
  const { searchText, searchedCurrentPage, searchedMovieList } = useSelector(
    (state) => state.appDB.searchedMovie
  );
  const { userLogin, isAuth } = useSelector((state) => state.appDB.user);

  const dispatch = useDispatch();
  const { setSearchedMovieListPage, authLogOut, setSearchedMovie } =
    bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    setSearchedMovie();
  }, [searchedCurrentPage]);
  const handlerAuthLogOut = () => {
    isAuthUser(false);
    authLogOut();
    return setTimeout(() => history.push("/"), 500);
  };

  const handlerSearch = () => {
    console.log(searchText);
  };

  const handlerTest = () => {
    console.log(searchText);
  };

  return (
    <>
      <Header
        loginName={userLogin || isAuth}
        handlerAuthLogOut={handlerAuthLogOut}
        handlerSearch={handlerSearch}
        handlerTest={handlerTest}
      />
      <Container className={classes.root}>
        <InfiniteScroll
          className={classes.root}
          dataLength={searchedMovieList.length}
          next={() => setSearchedMovieListPage(searchedCurrentPage + 1)}
          hasMore={true}
        >
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
        </InfiniteScroll>
      </Container>
    </>
  );
};
