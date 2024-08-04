import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { RootState } from '../redux/store'
import Loading from './Loading'
import { fetchComments } from '../redux/slices/commentSlice'
import { CommentType } from '../types/Types'
import Comment from './Comment'
import { useParams } from 'react-router-dom'

const CommentList = () => {

  const {comments,commentLoading} = useSelector((state:RootState) => state.comments)
    const dispatch = useDispatch<any>();
    const { id } = useParams();
    
  
    useEffect(() => {
        dispatch(fetchComments())
    },[])
  
  const filteredComments = comments.filter((comment: CommentType) => comment.postId === id);

  return (
    <div>
      {commentLoading ? (
        <Loading />
      ) : filteredComments.length === 0 ? (
        <div style={{textAlign:"center",marginTop:"80px",fontWeight:"bold",fontSize:"1.2rem"}}>Bu gönderiye henüz yorum yapılmamış</div>
      ) : (
        filteredComments.map((comment: CommentType) => (
          <Comment key={comment.id} commentProps={comment} />
        ))
      )}
    </div>
  )
}

export default CommentList