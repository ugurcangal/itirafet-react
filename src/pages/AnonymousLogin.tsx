import React from 'react';
import { useDispatch } from 'react-redux';
import { anonymousLogin } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import "../css/AnonymousLogin.css"

const AnonymousLogin: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await dispatch(anonymousLogin()).unwrap();
      navigate('/');
    } catch (error) {
      alert('Anonymous login failed');
    }
  };

  return (
    <div className='general'>
        <img src="./src/assets/logoText.svg" alt="" className='logo'/>
        <button className='login-btn' onClick={handleLogin}>Login Anonymously</button>
    </div>
  );
};

export default AnonymousLogin;