import { Box, Button, Modal, TextField } from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase";
import { getCurrentDateTime } from "../Util";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { PostType } from "../types/Types";
import { toast } from "react-toastify";

interface PostProps{
    postProps: PostType
}

const ComplainModal = ({postProps}: PostProps) => {
    const {id,postText} = postProps;

    const [open, setOpen] = useState(false);
    const [complainText, setComplainText] = useState<string>("");
    const {user} = useSelector((state:RootState) => state.auth)

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        bgcolor: 'background.paper',
        boxShadow: 12,
        p: 6,
        '&:focus': {
        outline: 'none'
        },
        '&:focus-visible': {
          outline: 'none'
        }
    };


    const sendComplain = async () => {
        if(complainText.length > 10){
            try{
                const docRef = await addDoc(collection(db,"Complains"),{
                    complainText:complainText,
                    date:getCurrentDateTime(),
                    complainer: user.uid,
                    postId: id
                });
                console.log("Doc id: ", docRef.id);
                toast.success("Şikayet gönderildi...", {style:{backgroundColor:"#1c524f"}})
                setComplainText("");
                setOpen(false);
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
        <Button sx={{ p: 2 }} onClick={handleOpen}>Şikayet Et</Button> 
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{...style, borderRadius:"10px"}}>
          <button style={{background:"none", border:"none", position:"absolute", top:"20px", right:"30px", fontSize:"2rem", color:"#f8853e",cursor:"pointer", }} onClick={handleClose}>x</button>
          <div style={{marginTop:"20px" ,fontWeight:"bold",}}>Şikayet edilecek gönderi :</div>
          <div style={{marginTop:"20px"}}>{postText}</div>
          <div style={{marginTop:"30px", fontWeight:"bold", color:"black"}}>Bu paylaşım ile ilgili şikayetini belirt:</div>
          <TextField
            id="outlined-multiline-static"
            placeholder='Şikayetini yaz...'
            multiline
            rows={4}
            variant="standard"
            fullWidth
            margin="normal" 
            sx={{marginTop:"40px",}}
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => setComplainText(e.target.value)}
          />
            <button style={{width:"100%"}} onClick={sendComplain} className='post-create-btn'>Şikayeti Gönder</button>
        </Box>
      </Modal>
    </div>
  )

}

export default ComplainModal