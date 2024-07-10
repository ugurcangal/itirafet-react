import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getAuth, onAuthStateChanged, signInAnonymously, User } from 'firebase/auth';
import {app} from '../../firebase';

const auth = getAuth(app);

interface AuthState {
  user: User | null;
  loading: boolean;
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  loading: true,
};


export const initializeAuth = createAsyncThunk<User | null, void, {}>('auth/initialize', async () => {
  return new Promise<User | null>((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
      resolve(user);
    });
  });
});


export const anonymousLogin = createAsyncThunk<User, void, {}>('auth/anonymousLogin', async () => {
  const userCredential = await signInAnonymously(auth);
  return userCredential.user;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initializeAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(initializeAuth.fulfilled, (state, action: PayloadAction<User | null>) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(initializeAuth.rejected, (state) => {
        state.loading = false;
      })
      .addCase(anonymousLogin.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload)); 
      });
  },
});

export default authSlice.reducer;