import { Store, configureStore } from '@reduxjs/toolkit'
import { postsSlice } from './slices/postsSlice'


export const store: Store = configureStore({
    reducer:{
        posts: postsSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch