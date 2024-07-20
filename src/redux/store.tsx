import { Store, configureStore } from '@reduxjs/toolkit'
import  postsSlice  from './slices/postsSlice'
import authSlice from './slices/authSlice'
import commentSlice from './slices/commentSlice'


export const store: Store = configureStore({
    reducer:{
        posts: postsSlice,
        auth: authSlice,
        comments: commentSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch