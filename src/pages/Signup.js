import React from 'react';
import '../styles/Signup.css';
import { auth } from '../components/Firebase.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      submitted: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { formData } = this.state;
    formData[e.target.name] = e.target.value;
    this.setState({ formData });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { formData } = this.state;
    if (formData.name === '' || formData.email === '' || formData.password === '' || formData.confirmPassword === '') {
      alert('Field empty' + formData[e.target.name]);
      this.setState({ submitted: false });
    }
    else if (formData.password.toString() !== formData.confirmPassword.toString()) {
      alert('Password does\'t match');
      this.setState({submitted: false});
    }
    else {
      createUserWithEmailAndPassword(auth, formData.email, formData.password)
        .then((res) => {
          console.log(res.user);
        })
        .catch((err) => alert(err.message));
      this.setState({ submitted: true});
    }
  }

  render() {
    const { formData } = this.state;
    return (
      <div className='signup'>
        <h1>SignUp</h1>
        <form className='signup-form' onSubmit={this.handleSubmit}>
          <label>Username
            <input type='text' name='username' onChange={this.handleChange} value={formData.username}/>
          </label>
          <label>Email
            <input type='email' name='email' onChange={this.handleChange} value={formData.email}/>
          </label>
          <label>Password
            <input type='password' name='password' onChange={this.handleChange} value={formData.password}/>
          </label>
          <label>Confirm Password
            <input type='password' name='confirmPassword' onChange={this.handleChange} value={formData.confirmPassword}/>
          </label>
          <button type='submit'>SignIn</button>
        </form>
      </div>
    );
  }
}

export default Signup;