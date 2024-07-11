
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { RootState } from '../redux/store'
import { PostType } from '../types/Types'
import { fetchPosts } from '../redux/slices/postsSlice'
import Post from './Post'
import Loading from './Loading'
const PostList = () => {

    const {posts,loading} = useSelector((state:RootState) => state.posts)
    const dispatch = useDispatch<any>();
    
  
    useEffect(() => {
        dispatch(fetchPosts())
    },[])
  
  return (
    <div>
        {loading ? <Loading/> : 
        posts && posts.map((post : PostType) => (
          <Post key={post.id} postProps = {post}/>
        ))
      } 
    </div>
  )
}

export default PostList