import { CommentType } from '../types/Types'


interface CommentProps{
    commentProps: CommentType
}

const Comment = ({commentProps} : CommentProps) => {

    const {userId,commentText,date} = commentProps;

  return (
    <div className="container">
      <div className="username">@anon-{userId}</div>
      <div className="post-text">{commentText}</div>
      <div className="post-date">{date}</div>
    </div>
  )
}

export default Comment