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

const GuardRoute = ({ children }) => {
  const isAuth = getLoggedUserLS();
  return isAuth ? children : <Redirect to="/" />;
};

// const PrivateRoute = ({ component: Component, ...rest }) => {
//   const isAuth = !!getLoggedUserLS();
//   console.log(isAuth);

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         isAuth === true ? (
//           <Component {...props} />
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/",
//               state: { from: props.location },
//             }}
//           />
//         )
//       }
//     />
//   );
// };

const Pages = () => {
  // const isAuth = !!getLoggedUserLS();
  // console.log(isAuth);
  return (
    <Router>
      <Switch>
        <Route exact path="/" componenet={MainForm} />
        {/* <MainForm /> */}
        <GuardRoute>
          <Header></Header>
          {/* <Switch> */}
          {/* <Route path="/signup" component={MainForm} /> */}
          <Route path="/main" component={Movies} />
          <Route path="/film/:id" component={MovieDetails} />
          <Route path="/search" component={Search} />
          <Route path="/favorite" component={Favorite} />
          <Route path="*" component={NotFound} />
          {/* </Switch> */}
        </GuardRoute>
      </Switch>
    </Router>
    // <>
    //   <Router>
    //     <Header>
    //       <Switch>
    //         <Route exact path="/" component={MainForm} />
    //         <PrivateRoute path="/main" component={Movies} />
    //         <PrivateRoute path="/film/:id" component={MovieDetails} />
    //         <PrivateRoute path="/search" component={Search} />
    //         <PrivateRoute path="/favorite" component={Favorite} />
    //         {/* <PrivateRoute isAuth={isAuth} path="*" component={NotFound} /> */}
    //       </Switch>
    //     </Header>
    //   </Router>
    // </>
  );
};

export default Pages;
