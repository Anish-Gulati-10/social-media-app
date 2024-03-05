import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import {post as Ipost} from "./Home";
import { auth, db } from "../../config/firebase";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import likeIcon from "../../assets/heart.svg";
import unlikeIcon from "../../assets/heart-filled.svg";
import userPfp from "../../assets/user.svg"

interface Props{
    post: Ipost;
}

interface like{
    likeId: string;
    uid: string;
}

export const Post = (props: Props ) =>{
    const [user] = useAuthState(auth);
    const [like, setLike] = useState<like[] | null>(null);
    const likeRef = collection(db, "likes");
    const likeDoc = query(likeRef, where("postId", "==", props.post.id));


    const addLike = async () =>{
        const newDoc = await addDoc(likeRef,{uid: user?.uid, postId: props.post.id});
        if (user) {
            setLike((prev)=> prev ? [...prev,{uid: user.uid, likeId:newDoc.id}]: [{uid: user.uid, likeId:newDoc.id}]);
        };
    };

    const getLikes = async() =>{
        const data = await getDocs(likeDoc);
        setLike(data.docs.map((doc)=>{
            return {uid: doc.data().uid, likeId:doc.id}
        }));
    };

    const hasLiked = like?.find((post)=> post.uid === user?.uid)

    const delLike = async() =>{
        const likeToDelQuery = query(likeRef, where("postId", "==", props.post.id), where("uid", "==", user?.uid));
        const liketoDelData = await getDocs(likeToDelQuery);
        const likeId = liketoDelData.docs[0].id
        const likeToDel = doc(db,"likes", likeId);
        await deleteDoc(likeToDel);
        if (user) {
            setLike(
              (prev) => prev && prev.filter((like) => like.likeId !== likeId)
            );
          };
    }

    useEffect(()=>{
        getLikes();
    }, []);

    const delPost = async () =>{
        const postRef = collection(db, "post");
        const postToDelQuery = query(postRef, where("uid", "==", user?.uid));
        const postToDelData = await getDocs(postToDelQuery);
        postToDelData.forEach(async (post)=>{
            if (post.id === props.post.id){
                await deleteDoc(post.ref)
            }
        })
        /* if (!postToDelData.empty) {
            const postId = postToDelData.docs[0].id;
            const postToDel = doc(db, "posts", postId);
            await deleteDoc(postToDel);
        } */
    }

    return <div className="post">
        <div className="writer">
            <img src={props.post.pfp || userPfp} width="20" height="20" alt="user pfp" />
            <h4>@{props.post.username}</h4>
        </div>
        <div className="content">
            <h2>{props.post.title}</h2>
            <p>{props.post.description}</p>
        </div>
        <div className="footer">
            <div style={{display:"flex"}}>
                <button onClick={hasLiked ? delLike : addLike} > 
                <img src={hasLiked ? unlikeIcon : likeIcon} alt=""/> 
                </button>
                {like && <p>{like?.length}</p>}
            </div>
            <div>
                {props.post.uid === user?.uid &&(<button onClick={delPost}>Delete</button>)}
            </div>
        </div>
    </div>
};

