import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { RootState } from "../redux/store";
import { PostType } from "../types/Types";
import Post from "./Post";
import SendComment from "./SendComment";
import CommentList from "./CommentList";
import { useEffect } from "react";
import { fetchPosts } from "../redux/slices/postsSlice";


const PostDetails = () => {
    const {posts} = useSelector((state:RootState) => state.posts)
    const { id } = useParams();
    const dispatch = useDispatch<any>();

    useEffect(() => {
        if (posts.length === 0) {
        dispatch(fetchPosts());
    }
    })
    
    
  return (
    <div>
        
        {
            posts && posts.map((post: PostType) => {
                if(post.id == id){
                    return <Post postProps = {post} variant="details"/>
                }
            })
        }
        <SendComment/>
        <CommentList/>
    </div>
  )
}

export default PostDetails