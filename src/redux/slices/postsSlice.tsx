import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {db} from '../../firebase'
import { collection , getDocs } from 'firebase/firestore';
import { PostType } from '../../types/Types';

interface PostState {
    posts: PostType[];
}

const initialState : PostState = {
    posts: [],
} 


export const fetchPosts = createAsyncThunk<PostType[],void,{}>("fetchPosts", async () => {
    const postCollection = collection(db,"Posts")
    const postSnapshot = await getDocs(postCollection)
    return postSnapshot.docs.map((doc) => ({
        id: doc.id,
        postText: doc.data().postText,
        date: doc.data().date
    })) as PostType[];
})

export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers:{
        
    },
    extraReducers:(builder) => {
        builder.addCase(fetchPosts.fulfilled, (state,action) => {
            state.posts = action.payload
        })
    }
})

export const {  } = postsSlice.actions

export default postsSlice.reducer