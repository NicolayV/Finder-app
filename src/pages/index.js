import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { Header } from "../components/ui/header";

import { MainForm } from "./Auth";
import { Favorite } from "./Favorite";
import { Movies } from "./Main";
import { MovieDetails } from "./MovieCard";
import { NotFound } from "./NotFound404";
import { Search } from "./Search";
import { getLoggedUserLS } from "../utils/storage";
import SignUp from "./SignUp";

// const GuardRoute = ({ children }) => {
//   const isAuth = getLoggedUserLS();
//   return isAuth ? children : <Redirect to="/" />;
// };

const Pages = () => {
  const isAuth = !!getLoggedUserLS();
  return (
    <>
      <Router>
        <Route exact path="/" componenet={MainForm} />
        {/* <GuardRoute> */}
        <Header />
        <Switch>
          <PrivateRoute isAuth={isAuth} path="/signup" component={SignUp} />
          <Route path="/main" component={Movies} />
          <PrivateRoute
            isAuth={isAuth}
            path="/film/:id"
            component={MovieDetails}
          />
          <PrivateRoute isAuth={isAuth} path="/search" component={Search} />
          <PrivateRoute isAuth={isAuth} path="/favorite" component={Favorite} />
          <Route path="*" component={NotFound} />
        </Switch>
        {/* </GuardRoute> */}
      </Router>
    </>
  );
};

const PrivateRoute = ({ component: Component, isAuth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/main",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default Pages;
