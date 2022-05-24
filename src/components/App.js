import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Home from '../pages/Home/Home';
import Signup from '../pages/Register/Signup';
import Header from './Header';
import Login from '../pages/Login/Login';
import Profil from '../pages/Profil/Profil';

function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <Routes>
          <Route exact path='/' element={<Login />}></Route>
          <Route exact path='/signup' element={<Signup />}></Route>
          <Route exact path='/home' element={<Home />}></Route>
          <Route exact path='/profil' element={<Profil />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
