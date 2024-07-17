import {Route, Routes, Navigate } from 'react-router-dom'
import Home from '../pages/Home';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import AnonymousLogin from '../pages/AnonymousLogin';
import { useEffect } from 'react';
import { initializeAuth } from '../redux/slices/authSlice';
import PostDetails from '../components/PostDetails';


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
        <Route path="/post/:id" element={<PostDetails />} />

      </Routes>
  );
}



export default RouterConfig