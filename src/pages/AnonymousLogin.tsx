import React from 'react';
import { useDispatch } from 'react-redux';
import { anonymousLogin } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import "../css/AnonymousLogin.css"
import logoText from '../assets/logoText.svg';

const AnonymousLogin: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await dispatch(anonymousLogin()).unwrap();
      navigate('/', {replace : true});
    } catch (error) {
      alert('Anonymous login failed');
    }
  };

  return (
    <div className='general'>
        <img src={logoText} alt="" className='logo'/>
        <button className='login-btn' onClick={handleLogin}>Login Anonymously</button>
    </div>
  );
};

export default AnonymousLogin;