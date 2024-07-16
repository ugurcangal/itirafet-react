export interface PostType{
    id: string,
    postText: string,
    date: string,
    userId: string,
    liker:string[],
}

export interface CommentType{
    id: string,
    postId: string,
    commentText: string,
    date: string,
    userId: string,
}