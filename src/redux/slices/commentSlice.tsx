import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {db} from '../../firebase'
import { collection , getDocs } from 'firebase/firestore';
import { CommentType,  } from '../../types/Types';

interface CommentState {
    comments: CommentType[];
    commentLoading: boolean;
}

const initialState : CommentState = {
    comments: [],
    commentLoading: false,
} 


export const fetchComments = createAsyncThunk<CommentType[],void,{}>("fetchComments", async () => {
    const commentCollection = collection(db,"Comments")
    const commentSnapshot = await getDocs(commentCollection)
    return commentSnapshot.docs.map((doc) => ({
        id: doc.id,
        postId: doc.data().postId,
        commentText: doc.data().commentText,
        date: doc.data().date,
        userId: doc.data().userId,
    })) as CommentType[];
})

export const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers:{
        
    },
    extraReducers:(builder) => {
        builder.addCase(fetchComments.pending, (state) => {
            state.commentLoading = true;
        })
        builder.addCase(fetchComments.fulfilled, (state,action) => {
            state.comments = action.payload.sort((a, b) => {
            const parseDate = (dateStr: string) => {
            // Gün, ay, yıl ve saat, dakika parçalarına ayır
            const [day, month, year, hour, minute] = dateStr.split(/[/\s:]/).map(Number);
            return new Date(year, month - 1, day, hour, minute);
            };

            const dateA = parseDate(a.date);
            const dateB = parseDate(b.date);
            return dateB.getTime() - dateA.getTime(); // Azalan sırada sıralama
            });
            state.commentLoading = false;
        })
    }
})

export const {  } = commentSlice.actions

export default commentSlice.reducer