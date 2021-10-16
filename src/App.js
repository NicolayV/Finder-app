import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Header } from "./components/ui/header";
// import { setIsAuth } from "./ducks/auth";
import { MainForm } from "./pages/Auth";
import { Favorite } from "./pages/Favorite";
import { Movies } from "./pages/Main";
import { MovieDetails } from "./pages/MovieCard";
import { Search } from "./pages/Search";
import { getIsAuthUser } from "./utils/storage";

const GuardRoute = ({ children }) => {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(setIsAuth());
  // }, [dispatch]);
  const isAuth = getIsAuthUser();
  // console.log(isAuth);
  // const isAuth = useSelector((state) => state.auth.isAuth);
  return isAuth ? children : <Redirect to="/" />;
};

// navLinks router dom
// navLinks with useContext
// in async funciton add cath error and add animation or text when data base is loading

const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <MainForm />
          </Route>
          <GuardRoute>
            <Header />
            <Route path="/main">
              <Movies />
            </Route>
            <Route path="/film/:id">
              <MovieDetails />
            </Route>
            <Route path="/search">
              <Search />
            </Route>
            <Route path="/favorite">
              <Favorite />
            </Route>
          </GuardRoute>
        </Switch>
      </Router>
    </>
  );
};

export default App;
