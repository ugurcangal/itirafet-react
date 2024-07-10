import {Route, Routes, Navigate } from 'react-router-dom'
import Home from '../pages/Home';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import AnonymousLogin from '../pages/AnonymousLogin';
import { useEffect } from 'react';
import { initializeAuth } from '../redux/slices/authSlice';


const RouterConfig = () => {
const user = useSelector((state: RootState) => state.auth.user);
const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return (
      <Routes>
        <Route path="/login" element={<AnonymousLogin />} />
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
      </Routes>
  );
}



export default RouterConfig