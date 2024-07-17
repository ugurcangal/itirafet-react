import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { RootState } from '../redux/store'
import Loading from './Loading'
import { fetchComments } from '../redux/slices/commentSlice'
import { CommentType } from '../types/Types'
import Comment from './Comment'
import { useParams } from 'react-router-dom'

const CommentList = () => {

  const {comments,loading} = useSelector((state:RootState) => state.comments)
    const dispatch = useDispatch<any>();
    const { id } = useParams();
    
  
    useEffect(() => {
        dispatch(fetchComments())
    },[])
  
  return (
    <div>
        {loading ? <Loading/> : 
        comments && comments.map((comment: CommentType) => {
                if(comment.postId == id){
                    return <Comment commentProps = {comment}/>
                }
            })
      } 
    </div>
  )
}

export default CommentList