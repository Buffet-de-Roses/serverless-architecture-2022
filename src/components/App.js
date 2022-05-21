import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import Home from './Home';
import Contact from './Contact';
import About from './About';
import Signup from './Signup';
import Header from './Header';
import { Login } from './Login';

class App extends React.Component {
  render() {
    return (
      <div className='app'>
        <Header />
        <Router>
          <div className='App'>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/about'>About</Link>
              </li>
              <li>
                <Link to='/contact'>Contact</Link>
              </li>
              <li>
                <Link to='/signup'>Signup</Link>
              </li>
              <li>
                <Link to='signin'>Signin</Link>
              </li>
            </ul>
            <Routes>
              <Route exact path='/' element={ <Home />}></Route>
              <Route exact path='/about' element={ <About />}></Route>
              <Route exact path='/contact' element={ <Contact />}></Route>
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
