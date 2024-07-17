import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Loading = () => {

    const {loading} = useSelector((state:RootState) => state.posts)
    const {commentLoading} = useSelector((state:RootState) => state.comments)
    
  return (
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading || commentLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
  )
}

export default Loading