import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { MainForm } from "./pages/authPage/index";
import { Movies } from "./pages/movies";
import { MovieDetails } from "./pages/movieCard/movieCard";
import { SearchPage } from "./pages/searchPage/searchPage";

// 1) redux-thunk for async operations in redux
// 2) base url for axios
// 3) movie detail page
// 4) search movies div below input

const GuardRoute = ({ children }) => {
  const isAuth = useSelector((state) => state.appDB.user.isAuth);
  return isAuth ? children : <Redirect to="/" />;
};

export default function App() {
  // const isAuth = useSelector((state) => state.auth.auth);

  // if (!isAuth) {
  //   return (
  //     <Router>
  //       <Route exact path="/" component={MainForm} />
  //       <Redirect to="/" />
  //     </Router>
  //   );
  // }

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={MainForm} />
          <GuardRoute>
            <Route path="/Step2" component={Movies} />
            <Route path="/film/:id" component={MovieDetails} />
            <Route path="/search" component={SearchPage} />
          </GuardRoute>
        </Switch>
      </Router>
    </>
  );
}
