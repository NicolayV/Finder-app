import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { MainForm } from "./pages/auth";
import { Movies } from "./pages/movies";

// done 1) autologin after reload
// +-done 2) search films with debounce. Debounce from lodash. Only debounce from lodash
// done 3) infinity scroll or pagination for movies
// 4) redux-thunk for async operations in redux
// done 5) flex-wrap or grid
// 6) base url for axios

const GuardRoute = ({ children }) => {
  const isAuth = useSelector((state) => state.auth.isAuth);
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
          </GuardRoute>
        </Switch>
      </Router>
    </>
  );
}
