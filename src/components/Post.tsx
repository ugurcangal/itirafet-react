import { PostType } from "../types/Types"
import "../css/Post.css"
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
// import { FaRegComment } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { db } from "../firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import CommentModal from "./CommentModal";


interface PostProps{
    postProps: PostType
}

const Post = ({postProps}: PostProps) => {
  const {id,postText,date,userId,liker} = postProps;

  const [currentLiker, setCurrentLiker] = useState(liker);
  const {user} = useSelector((state:RootState) => state.auth)
  
  
  const like = async () => {
    try {
      const postDocRef = doc(db, 'Posts', id);
      await updateDoc(postDocRef, {
        liker: arrayUnion(user.uid)
      });
      setCurrentLiker((currentLiker) => [...currentLiker, user.uid])
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };
  
  const dislike = async () => {
    try {
      const postDocRef = doc(db, 'Posts', id);
      await updateDoc(postDocRef, {
        liker: arrayRemove(user.uid)
      });
      setCurrentLiker((prev) => prev.filter((uid) => uid !== user.uid));
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };
  
  return (
    <div className="container">
      <div className="username">@anon-{userId}</div>
      <div className="post-text">{postText}</div>
      <div className="post-date">{date}</div>
      <div className="btn-container">
        <div className="like-count">{currentLiker.length}</div>
        { currentLiker.includes(user.uid) ? <FaHeart onClick={dislike} className="icon"/> : <FaRegHeart onClick={like} className="icon" /> }
        <CommentModal postProps = {postProps}/>
        <HiDotsVertical className="icon"/>
        
      </div>
      
    </div>
    
  )
}

export default Post