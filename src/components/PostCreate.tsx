import "../css/PostCreate.css"

const PostCreate = () => {


    
  return (
    <div className='postCreate-div'>
        <input className='post-input' type="text" placeholder='Bir itirafını paylaş...' />
        <button className='post-create-btn'>Gönder</button>
    </div>
  )
}

export default PostCreate