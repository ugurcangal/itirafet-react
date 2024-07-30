import { useState } from "react"
import "../css/ProfileTabs.css"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import Post from "./Post"
import { PostType } from "../types/Types"
import { MdOutlineGrid4X4 } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";


const ProfileTabs = () => {

    const [toggleState, setToggleState] = useState(1)

    const toggleTab = (index:number) =>{
        setToggleState(index)
    }

    const {posts} = useSelector((state:RootState) => state.posts)
    const {user} = useSelector((state:RootState) => state.auth)

  return (
    <div className="tabs-container">
        <div className="tabs-box">
            <div className={toggleState === 1 ? "tabs active" : "tabs"} onClick={() => toggleTab(1)}>
                <MdOutlineGrid4X4 />
                <p>Gönderiler</p>
            </div>
            <div className={toggleState === 2 ? "tabs active" : "tabs"} onClick={() => toggleTab(2)}>
                <FaRegHeart/>
                <p>Beğenilenler</p>
            </div>
        </div>

        <div className="content-box">
            {toggleState === 1 && 
                posts && posts.map((post: PostType) => {
                if (post.userId === user.uid) {
                    return <Post key={post.id} postProps={post} variant="default" />;
                } else {
                    return null;
                }
                })
            }
            {toggleState === 2 && 
                posts && posts.map((post: PostType) => {
                if (post.liker.includes(user.uid)) {
                    return <Post key={post.id} postProps={post} variant="default" />;
                } else {
                    return null;
                }
                })
            }
        </div>

    </div>
  )

}

export default ProfileTabs