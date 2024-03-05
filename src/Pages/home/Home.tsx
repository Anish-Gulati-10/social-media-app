import { collection, getDocs } from "firebase/firestore";
import { auth, db, provider } from "../../config/firebase";
import { useEffect, useState } from "react";
import { Post } from "./post";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export interface post {
    title:string;
    uid: string;
    username: string;
    description: string;
    id: string;
    pfp: string;
}

export const Home = () =>{
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const [postsList, setPostsList] = useState<post[] | null>(null);

    useEffect(()=>{
        const collRef = collection(db, "post");
        const getPost = async () =>{
            const data = await getDocs(collRef);
            setPostsList(data.docs.map((post) => ({...post.data(), id:post.id})) as post[] );
        }
        if (user){
            getPost();
        }
    }, [postsList]);


    if (user){
        return <div className="posts-list">
            {postsList?.map((post) =>{
                return <Post post={post}/>
            })}
        </div>
    } else{
        const signInWithGoogle = async() =>{
            await signInWithPopup(auth,provider);
            navigate("/");
        };
        return <div className="signin-box">
            <button className="signin-button" onClick={signInWithGoogle}>Sign In</button>
        </div>
    }
};