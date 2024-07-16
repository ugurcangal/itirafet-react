import { useState } from 'react';
import { Modal, Box, TextField } from '@mui/material';
import { FaRegComment } from 'react-icons/fa';
import { PostType } from '../types/Types';

interface PostProps{
    postProps: PostType
}

const CommentModal = ({postProps}: PostProps) => {
const {postText,userId} = postProps;
    
  const [open, setOpen] = useState(false);

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
  };

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
          <button style={{background:"none", border:"none", position:"absolute", top:"20px", right:"30px", fontSize:"2rem", color:"#1c524f",cursor:"pointer"}} onClick={handleClose}>x</button>
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
          />
          <Box mt={2} display="flex" justifyContent="flex-end">

            <button className='post-create-btn'>Yorumu Paylaş</button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default CommentModal;
