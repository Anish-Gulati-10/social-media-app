import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {addDoc, collection} from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

interface post {
    title: string;
    description: string
};

export const PostForm = () =>{
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const schema = yup.object().shape({
        title: yup.string().required("Title is missing"),
        description: yup.string().required("Description is missing")
    });

    const {register, handleSubmit, formState:{errors} } = useForm<post>({
        resolver: yupResolver(schema)
    });

    const collRef = collection(db, "post");

    const onCreatePost = async (data: post) =>{
        await addDoc(collRef, {
            ...data,
            username: user?.displayName,
            uid: user?.uid,
            pfp: user?.photoURL
        });
        navigate("/");
    };

    return (<form onSubmit={handleSubmit(onCreatePost)}>
        <input placeholder="Title..." {...register("title")} id="title"/>
        <p style={{color:"red"}}>{errors.title?.message}</p>
        <textarea placeholder="Description..." {...register("description")} />
        <p style={{color:"red"}}>{errors.description?.message}</p>
        <input type="submit" id="submit"/>
    </form>)
}