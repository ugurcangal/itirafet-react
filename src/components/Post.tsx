import { PostType } from "../types/Types"
import "../css/Post.css"
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";


interface PostProps{
    postProps: PostType
}

const Post = ({postProps}: PostProps) => {
  const {postText,date,userId} = postProps;
  
  return (
    <div className="container">
      <div className="username">@anon-{userId}</div>
      <div className="post-text">{postText}</div>
      <div className="post-date">{date}</div>
      <div className="btn-container">
        <div className="like-count">0</div>
        <FaRegHeart className="icon" />
        {/* <FaHeart className="icon"/> */}
        <FaRegComment className="icon"/>
        <HiDotsVertical className="icon"/>
      </div>
      
    </div>
    
  )
}

export default Post