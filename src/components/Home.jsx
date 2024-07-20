import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="home-container">
      <h1>Welcome to Our Website</h1>
      <button onClick={goToLogin}>Login</button>
    </div>
  );
};

export default Home;
