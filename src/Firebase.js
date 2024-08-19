import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage"
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "",
  authDomain: "chat-capstone.firebaseapp.com",
  projectId: "chat-capstone",
  storageBucket: "chat-capstone.appspot.com",
  messagingSenderId: "",
  appId: ""
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth=getAuth();
export const storage = getStorage();
export const db=getFirestore();
