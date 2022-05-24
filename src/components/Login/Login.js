/* eslint-disable react/no-unescaped-entities */
// import React from 'react';
// import { auth } from './Firebase';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import './Login.css';

// export class Login extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       formData: {
//         email: '',
//         password: '',
//       },
//       submitted: false,
//     };
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(e) {
//     const { formData } = this.state;
//     formData[e.target.name] = e.target.value;
//     this.setState({ formData });
//   }

//   async handleSubmit(e) {
//     e.preventDefault();
//     const { formData } = this.state;
//     if (formData.email === '' || formData.password === '') {
//       alert('Field empty' + formData[e.target.name]);
//       this.setState({submitted: false});
//     }
//     signInWithEmailAndPassword(auth, formData.email, formData.password)
//       .then((res) => {
//         console.log(res.user);
//         this.setState({submitted: true});
//         localStorage.setItem('accessToken', res.user.accessToken);
//       })
//       .catch((e) => alert(e.message));
//   }

//   render() {
//     const { formData } = this.state;
//     return (
//       <div>
//         <h1>SignIn</h1>
//         <form className='signin-form' onSubmit={this.handleSubmit}>
//           <label>Email
//             <input type='email' name='email' onChange={this.handleChange} value={formData.email}/>
//           </label>
//           <label>Password
//             <input type='password' name='password' onChange={this.handleChange} value={formData.password}/>
//           </label>
//           <button type='submit'>SignIn</button>
//         </form>
//       </div>
//     );
//   }
// }

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, signInWithEmailAndPassword, signInWithGoogle } from '../Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate('/Home');
  }, [user, loading]);
  return (
    <div className="login">
      <div className="login__container">
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="login__btn"
          onClick={() => signInWithEmailAndPassword(auth, email, password)}
        >
          Login
        </button>
        <button className="login__btn login__google" onClick={signInWithGoogle}>
          Login with Google
        </button>
        <div>
          <Link to="/reset">Forgot Password</Link>
        </div>
        <div>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
      </div>
    </div>
  );
}
export default Login;