import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import axios from '../api';
import './Login.css';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    try {
      const { data } = await axios.post('/auth', form);
      localStorage.setItem('profile', JSON.stringify(data));
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleSuccess = async (response) => {
    try {
      const { data } = await googleSignIn(response.credential);
      localStorage.setItem('profile', JSON.stringify(data));
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleFailure = (error) => {
    console.log('Google Sign In was unsuccessful. Try again later');
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={onFinish}>
        <h2>Login</h2>
        <input type="email" name="email" onChange={handleChange} placeholder="Email" required />
        <input type="password" name="password" onChange={handleChange} placeholder="Password" required />
        <button type="submit">Login</button>
        <div className="google-login">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
          />
        </div>
        <p>
           Do not have an account?<Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
