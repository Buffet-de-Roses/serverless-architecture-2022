import React from 'react';
import { auth } from '../components/Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        email: '',
        password: '',
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
    if (formData.email === '' || formData.password === '') {
      alert('Field empty' + formData[e.target.name]);
      this.setState({submitted: false});
    }
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((res) => {
        console.log(res.user);
        this.setState({submitted: true});
        localStorage.setItem('accessToken', res.user.accessToken);
      })
      .catch((e) => alert(e.message));
  }

  render() {
    const { formData } = this.state;
    return (
      <div>
        <h1>SignIn</h1>
        <form className='signin-form' onSubmit={this.handleSubmit}>
          <label>Email
            <input type='email' name='email' onChange={this.handleChange} value={formData.email}/>
          </label>
          <label>Password
            <input type='password' name='password' onChange={this.handleChange} value={formData.password}/>
          </label>
          <button type='submit'>SignIn</button>
        </form>
      </div>
    );
  }
}