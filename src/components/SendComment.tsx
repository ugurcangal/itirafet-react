import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase";
import { getCurrentDateTime } from "../Util";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchComments } from "../redux/slices/commentSlice";
import "../css/SendComment.css"

const SendComment = () => {

    const [commentText, setCommentText] = useState<string>("");
    
    const {user} = useSelector((state:RootState) => state.auth)
    const { id } = useParams();
    const dispatch = useDispatch<any>();
    
    const sendComment = async () => {
        if(commentText.length > 10){
            try{
                const docRef = await addDoc(collection(db,"Comments"),{
                    commentText:commentText,
                    date:getCurrentDateTime(),
                    userId: user.uid,
                    postId: id
                });
                console.log("Doc id: ", docRef.id);
                toast.success("Yorumunuz gönderildi...", {style:{backgroundColor:"#1c524f"}})
                setCommentText("");
                dispatch(fetchComments());
            }
            catch(e){
                console.error("Error adding document: ", e)
            }
        }else{
            toast.error("İçeriğiniz çok kısa!");
        }
    }
    
  return (
    <div className='sendComment-div'>
        <input value={commentText} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setCommentText(e.target.value)} className='comment-input' type="text" placeholder='Yorumunu paylaş...' />
        <button onClick={sendComment} className='sendComment-btn' type="submit">Gönder</button>
    </div>
  )
}

export default SendComment