import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MainForm } from './pages/auth'
import { Movies } from './pages/movies';

export default function App() {


  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={MainForm} />
          <Route path="/Step2" component={Movies} />
        </Switch>
      </Router>
    </>
  );

}

