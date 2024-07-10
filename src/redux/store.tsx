import { Store, configureStore } from '@reduxjs/toolkit'
import { postsSlice } from './slices/postsSlice'
import authSlice from './slices/authSlice'


export const store: Store = configureStore({
    reducer:{
        posts: postsSlice.reducer,
        auth: authSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch