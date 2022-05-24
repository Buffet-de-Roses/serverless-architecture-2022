import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Home from './Home/Home';
import Contact from './Contact';
import About from './About';
import Signup from './Register/Signup';
import Header from './Header';
import Login from './Login/Login';
import Profil from './Profil/Profil';

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
      <div className="app">
        <Router>
          <Header />
          <Routes>
            <Route exact path='/' element={<Login />}></Route>
            <Route exact path='/signup' element={<Signup />}></Route>
            <Route exact path='/home' element={<Home />}></Route>
            <Route exact path='/about' element={<About />}></Route>
            <Route exact path='/profil' element={<Profil />}></Route>
            <Route exact path='/contact' element={<Contact />}></Route>
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
