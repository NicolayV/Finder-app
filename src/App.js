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

// 1) redux-thunk for async operations in redux
// 2) base url for axios
// 3) movie detail page
// 4) search movies div below input

const GuardRoute = ({ children }) => {
  const isAuth = useSelector((state) => state.auth.user.isAuth);
  return isAuth ? children : <Redirect to="/" />;
};

export default function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={MainForm} />
          <GuardRoute>
            <Route path="/main" component={Movies} />
            <Route path="/film/:id" component={MovieDetails} />
            <Route path="/search" component={Search} />
            <Route path="/favorite" component={Favorite} />
          </GuardRoute>
        </Switch>
      </Router>
    </>
  );
}
