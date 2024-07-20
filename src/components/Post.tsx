import { PostType } from "../types/Types"
import "../css/Post.css"
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
// import { FaRegComment } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { db } from "../firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import CommentModal from "./CommentModal";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { updateLiker } from "../redux/slices/postsSlice";
;


interface PostProps{
    postProps: PostType,
    variant?: "default" | "details";
}

const Post = ({postProps, variant="default"}: PostProps) => {
  const {id,postText,date,userId,liker} = postProps;

  const [currentLiker, setCurrentLiker] = useState(liker);
  const {user} = useSelector((state:RootState) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const like = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const postDocRef = doc(db, 'Posts', id);
      await updateDoc(postDocRef, {
        liker: arrayUnion(user.uid)
      });
      setCurrentLiker((currentLiker) => [...currentLiker, user.uid])
      dispatch(updateLiker({ id, liker: [...currentLiker, user.uid] }));
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };
  
  const dislike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const postDocRef = doc(db, 'Posts', id);
      await updateDoc(postDocRef, {
        liker: arrayRemove(user.uid)
      });
      setCurrentLiker((prev) => prev.filter((uid) => uid !== user.uid));
      dispatch(updateLiker({ id, liker: currentLiker.filter((uid) => uid !== user.uid) }));
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  
  return (
    <div className="container" onClick={() => { if (variant === 'default') navigate("/post/" + id); }}>
      {variant === 'details' ? (
        <div
          className="back-btn"
          onClick={(e) => {
            e.stopPropagation();
            navigate("/");
          }}
        >
          <IoArrowBack />
        </div>
      ) : ""}
      <div className="username">@anon-{userId}</div>
      <div className="post-text">{postText}</div>
      <div className="post-date">{date}</div>
      <div className="btn-container">
        <div className="like-count">{currentLiker.length}</div>
        { currentLiker.includes(user.uid) ? <FaHeart onClick={dislike} className="icon"/> : <FaRegHeart onClick={like} className="icon" /> }
        <div onClick={(e) => e.stopPropagation()}>
          <CommentModal postProps={postProps} />
        </div>
        <HiDotsVertical onClick={(e) => e.stopPropagation()} className="icon"/>
      </div>
      
    </div>
    
  )
}

export default Post