import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC7sCTpUx10FljSAOy6NkUrvbA74HbFLhM",
  authDomain: "notesvault-76cad.firebaseapp.com",
  projectId: "notesvault-76cad",
  storageBucket: "notesvault-76cad.appspot.com",
  messagingSenderId: "62712504327",
  appId: "1:62712504327:web:12a6d64614b653ea9f8aa2"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
