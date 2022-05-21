import React from 'react';
import '../styles/Header.css';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav>
        <div className='header'>
          <h3>Registration</h3>
        </div>
      </nav>
    );
  }
}