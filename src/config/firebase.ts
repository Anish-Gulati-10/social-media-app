// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8c2_ljinSp5qOiBSZ2X7DwZcqhXGA8fA",
  authDomain: "social-media-app-4c39f.firebaseapp.com",
  projectId: "social-media-app-4c39f",
  storageBucket: "social-media-app-4c39f.appspot.com",
  messagingSenderId: "577949341121",
  appId: "1:577949341121:web:859691d4429aed0ebf8b40"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);