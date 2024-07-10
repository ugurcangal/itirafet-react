import PostList from '../components/PostList'
import PostCreate from '../components/PostCreate'

const Home = () => {
  return (
    <div>
        <PostCreate/>
        <PostList/>
    </div>
  )
}

export default Home