import { useNavigate } from "react-router-dom";
import "../css/Header.css"
import { IoPersonSharp } from "react-icons/io5";


const Header = () => {

    const navigate = useNavigate();
    
    
  return (
        <div className='header'>
            <div className="header-logo">
                {/* <img className='logo' src="./src/assets/logoText.svg" alt="" /> */}
                <p onClick={() => {navigate("/")}}>İtiraf Et</p>
            </div>
            <div>
                <div className="header-icon" onClick={() => { navigate("/profile/");}} style={{display:"flex", flexDirection:"row", alignItems:"center",justifyContent:"center",}}>
                    <IoPersonSharp />
                    <p>Profile</p>
                </div>
            </div>
        </div>
    );
}

export default Header