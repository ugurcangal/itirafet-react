import "../css/PostCreate.css"
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { toast } from "react-toastify";
import { fetchPosts } from "../redux/slices/postsSlice";
import { getCurrentDateTime } from "../Util";


const PostCreate = () => {

    const [postText, setPostText] = useState<string>("");
    const {user} = useSelector((state:RootState) => state.auth)
    const dispatch = useDispatch<any>();

    


    const addPost = async () => {
        if(postText.length > 10){
            try{
                const docRef = await addDoc(collection(db,"Posts"),{
                    postText:postText,
                    date:getCurrentDateTime(),
                    userId: user.uid,
                    liker: []
                });
                console.log("Doc id: ", docRef.id);
                // window.location.reload();
                toast.success("İtirafınız Paylaşıldı...", {style:{backgroundColor:"#1c524f"}})
                setPostText("");
                dispatch(fetchPosts());
            }
            catch(e){
                console.error("Error adding document: ", e)
            }
        }else{
            toast.error("İçeriğiniz çok kısa!");
        }
    }
    
  return (
    <div className='postCreate-div'>
        <input value={postText} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setPostText(e.target.value)} className='post-input' type="text" placeholder='Bir itirafını paylaş...' />
        <button onClick={addPost} className='post-create-btn' type="submit">Gönder</button>
    </div>
  )
}

export default PostCreate