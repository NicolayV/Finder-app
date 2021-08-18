import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { MainForm } from "./pages/Auth";
import { Favorite } from "./pages/Favorite";
import { Movies } from "./pages/Main";
import { MovieDetails } from "./pages/MovieCard";
import { Search } from "./pages/Search";

const GuardRoute = ({ children }) => {
  const isAuth = useSelector((state) => state.auth.user.isAuth);
  return isAuth ? children : <Redirect to="/" />;
};

export default function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <MainForm />
          </Route>
          <GuardRoute>
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
}
