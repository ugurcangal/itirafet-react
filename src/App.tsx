import { Bounce, ToastContainer } from 'react-toastify'
import './App.css'
import RouterConfig from './config/RouterConfig'
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';

function App() {
  
 const user = useSelector((state: RootState) => state.auth.user);
  
  return (
    <div>
      {user ? <Header/> : null}
      <RouterConfig/>
      <ToastContainer 
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </div>
  )
}

export default App
