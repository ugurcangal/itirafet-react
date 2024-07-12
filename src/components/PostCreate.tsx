import "../css/PostCreate.css"
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import {  useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { toast } from "react-toastify";


const PostCreate = () => {

    const [postText, setPostText] = useState("");
    const {user} = useSelector((state:RootState) => state.auth)

    const getCurrentDateTime = () => {
    const now = new Date(); // Şu anki tarih ve saat bilgisini al

    // Tarih ve saat bilgisini istediğimiz formatta stringe dönüştür
    const day = now.getDate().toString().padStart(2, '0'); // Gün (iki haneli olarak)
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Ay (1-12 arası, iki haneli olarak)
    const year = now.getFullYear(); // Yıl
    const hours = now.getHours().toString().padStart(2, '0'); // Saat (24 saat formatında, iki haneli olarak)
    const minutes = now.getMinutes().toString().padStart(2, '0'); // Dakika (iki haneli olarak)

    // İstediğiniz formatta tarih ve saat stringini oluştur
    const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}`;

    return formattedDateTime;
};
    
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
                setPostText("");
                // window.location.reload();
                toast.success("İtirafınız Paylaşıldı...", {style:{backgroundColor:"#1c524f"}})
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
        <input onChange={(e:React.ChangeEvent<HTMLInputElement>) => setPostText(e.target.value)} className='post-input' type="text" placeholder='Bir itirafını paylaş...' />
        <button onClick={addPost} className='post-create-btn' type="submit">Gönder</button>
    </div>
  )
}

export default PostCreate