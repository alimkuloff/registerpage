import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "../api"
import './Register.css';

const Register = () => {
  
  const [form, setForm] = useState({
    first_name: '',
    username: '',
    photoUrl: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    try {
      const { data } = await axios.post('/auth', form);
      localStorage.setItem('profile', JSON.stringify(data));
      navigate('/admin');
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={onFinish}>
        <h2>Register</h2>
        <input type="text" name="firstname" onChange={handleChange} placeholder="First Name" required />
        <input type="text" name="username" onChange={handleChange} placeholder="Username" required />
        <input type="text" name="photoUrl" onChange={handleChange} placeholder="Photo URL" />
        <input type="password" name="password" onChange={handleChange} placeholder="Password" required />
        <button type="submit">Register</button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};



export default Register;
