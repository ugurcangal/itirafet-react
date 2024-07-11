import { PostType } from "../types/Types"
import "../css/Post.css"


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
    </div>
  )
}

export default Post