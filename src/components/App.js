import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import Home from '../pages/Home';
import Signup from '../pages/Signup';
import Header from './Header';
import { Login } from '../pages/Login';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      routes: [{
        name: 'Home',
        route: '/',
        page: <Home />,
      },
      {
        name: 'Signup',
        route: '/signup',
        page: <Signup />
      },
      {
        name: 'Signin',
        route: '/signin',
        page: <Login />
      }
      ]
    };
  }
  render() {
    return (
      <div className='app'>
        <Header />
        <Router>
          <div className='App'>
            <ul>
              {this.state.routes.map((route) => 
                <li key={route.name}>
                  <Link to={route.route}>{route.name}</Link>
                </li>
              )}
            </ul>
            <Routes>
              <Route exact path='/' element={ <Home />}></Route>
              <Route exact path='/signup' element={ <Signup />}></Route>
              <Route exact path='/signin' element={ <Login /> }></Route>
            </Routes>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
