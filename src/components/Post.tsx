import { PostType } from "../types/Types"
import "../css/Post.css"

interface PostProps{
    postProps: PostType
}

const Post = ({postProps}: PostProps) => {
  const {id,postText,date} = postProps;


  return (
    <div className="container">
      <div className="post">{postText}</div>
      <div className="post-date">{date}</div>
    </div>
  )
}

export default Post