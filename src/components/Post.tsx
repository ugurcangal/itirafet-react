import { PostType } from "../types/Types"
import "../css/Post.css"
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface PostProps{
    postProps: PostType
}

const Post = ({postProps}: PostProps) => {
  const {postText,date} = postProps;
  const user = useSelector((state: RootState) => state.auth.user);
  
  return (
    <div className="container">
      <div className="username">@anon-{user.uid}</div>
      <div className="post-text">{postText}</div>
      <div className="post-date">{date}</div>
    </div>
  )
}

export default Post