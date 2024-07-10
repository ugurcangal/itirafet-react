import React from 'react';
import { useDispatch } from 'react-redux';
import { anonymousLogin } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

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
    <button onClick={handleLogin}>Login Anonymously</button>
  );
};

export default AnonymousLogin;