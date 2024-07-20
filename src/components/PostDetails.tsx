import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { RootState } from "../redux/store";
import { PostType } from "../types/Types";
import Post from "./Post";
import SendComment from "./SendComment";
import CommentList from "./CommentList";



const PostDetails = () => {
    const {posts} = useSelector((state:RootState) => state.posts)
    const { id } = useParams();   
    
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