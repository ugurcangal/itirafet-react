import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit'
import {db} from '../../firebase'
import { collection , getDocs } from 'firebase/firestore';
import { PostType } from '../../types/Types';

interface PostState {
    posts: PostType[];
    loading: boolean;
}

const initialState : PostState = {
    posts: [],
    loading: false,
} 


export const fetchPosts = createAsyncThunk<PostType[],void,{}>("fetchPosts", async () => {
    const postCollection = collection(db,"Posts")
    const postSnapshot = await getDocs(postCollection)
    return postSnapshot.docs.map((doc) => ({
        id: doc.id,
        postText: doc.data().postText,
        date: doc.data().date,
        userId: doc.data().userId,
        liker: doc.data().liker
    })) as PostType[];
})

export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers:{
        updateLiker: (state, action: PayloadAction<{ id: string, liker: string[] }>) => {
            const { id, liker } = action.payload;
            const post = state.posts.find(post => post.id === id);
            if (post) {
                post.liker = liker;
            }
        },
    },
    extraReducers:(builder) => {
        builder.addCase(fetchPosts.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchPosts.fulfilled, (state,action) => {
            state.posts = action.payload.sort((a, b) => {
            const parseDate = (dateStr: string) => {
            // Gün, ay, yıl ve saat, dakika parçalarına ayır
            const [day, month, year, hour, minute] = dateStr.split(/[/\s:]/).map(Number);
            return new Date(year, month - 1, day, hour, minute);
            };

            const dateA = parseDate(a.date);
            const dateB = parseDate(b.date);
            return dateB.getTime() - dateA.getTime(); // Azalan sırada sıralama
            });
            state.loading = false;
        })
    }
})

export const { updateLiker } = postsSlice.actions

export default postsSlice.reducer