
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { RootState } from '../redux/store'
import { PostType } from '../types/Types'
import { fetchPosts } from '../redux/slices/postsSlice'
import Post from './Post'
const PostList = () => {

    const {posts} = useSelector((state:RootState) => state.posts)
    const dispatch = useDispatch<any>();
    
  
    useEffect(() => {
        dispatch(fetchPosts())
    },[])
  
  return (
    <div>
        {
        posts && posts.map((post : PostType) => (
          <Post key={post.id} postProps = {post}/>
        ))
      }
    </div>
  )
}

export default PostList