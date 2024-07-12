import { Bounce, ToastContainer } from 'react-toastify'
import './App.css'
import RouterConfig from './config/RouterConfig'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  
 
  
  return (
    <div>
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
