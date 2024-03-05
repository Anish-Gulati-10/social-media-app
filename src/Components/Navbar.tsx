import { Link} from "react-router-dom";
import { auth } from "../config/firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {signOut} from "firebase/auth";


export const Navbar = () =>{
    const [user] = useAuthState(auth);
    const logout = async() =>{
        await signOut(auth);
    }
    return (
        <div className="navbar">
            <div>
                <Link to='/' className="link">Home</Link>
                {user && (<Link to='/create-post' className="link">Create Post</Link>)}
            </div>
            <div className="user">
                {user && (
                    <><img src={user?.photoURL || ""} width="30" height="30" alt="user pfp" />
                    <p>{user?.displayName}</p>
                    <button onClick={logout}>Sign out</button></>
                )}
            </div>
        </div>
    );

};