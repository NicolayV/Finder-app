import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MainForm } from './components/mainForm'
import { Auth } from './pages/auth';

export default function App() {


  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={MainForm} />
          <Route path="/Step2" component={Auth} />
        </Switch>
      </Router>
    </>
  );

}

