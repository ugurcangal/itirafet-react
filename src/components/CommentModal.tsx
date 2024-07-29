import { useState } from 'react';
import { Modal, Box, TextField } from '@mui/material';
import { FaRegComment } from 'react-icons/fa';
import { PostType } from '../types/Types';
import { getCurrentDateTime } from '../Util';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { toast } from 'react-toastify';

interface PostProps{
    postProps: PostType
}

const CommentModal = ({postProps}: PostProps) => {
    const {id,postText,userId} = postProps;
    
    const {user} = useSelector((state:RootState) => state.auth)
    // const dispatch = useDispatch<any>();
    
    const [open, setOpen] = useState(false);
    const [commentText, setCommentText] = useState<string>("");

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        boxShadow: 12,
        p: 10,
        '&:focus': {
        outline: 'none'
        },
        '&:focus-visible': {
          outline: 'none'
        }
    };



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
                setOpen(false)
            }
            catch(e){
                console.error("Error adding document: ", e)
            }
        }else{
            toast.error("İçeriğiniz çok kısa!");
        }
    }
  

  return (
    <div>
      <FaRegComment onClick={handleOpen} className='btn-container icon'/>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{...style, borderRadius:"10px"}}>
          <button style={{background:"none", border:"none", position:"absolute", top:"20px", right:"30px", fontSize:"2rem", color:"#f8853e",cursor:"pointer", }} onClick={handleClose}>x</button>
          <h4 style={{color:"#1c524f"}}>@anon-{userId} : </h4>
          <div style={{marginLeft:"20px", marginTop:"30px"}}>{postText}</div>
          <TextField
            id="outlined-multiline-static"
            placeholder='Yorumunu yaz!'
            multiline
            rows={4}
            variant="standard"
            fullWidth
            margin="normal" 
            sx={{marginTop:"50px",}}
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => setCommentText(e.target.value)}
          />
          <Box mt={2} display="flex" justifyContent="flex-end">

            <button onClick={sendComment} className='post-create-btn'>Yorumu Paylaş</button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default CommentModal;
