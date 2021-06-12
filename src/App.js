import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Login } from './pages/Login'
import { Signin } from './pages/Signin'
import { DataProvider } from './DataContext'


function App() {
  return (
    <>
      <DataProvider>
        <Router>
          <Navbar />

          <div>
            <Switch>
              <Route path='/login' component={Login} />
              <Route path='/signin' component={Signin} />
            </Switch>
          </div>
        </Router>
      </DataProvider>
    </>
  );

}

export default App;
