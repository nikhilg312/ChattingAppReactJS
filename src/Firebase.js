import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage"
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyAHaOCCbPIAV9fOdYghT_-PDpTGA_ZiaS0",
  authDomain: "chat-capstone.firebaseapp.com",
  projectId: "chat-capstone",
  storageBucket: "chat-capstone.appspot.com",
  messagingSenderId: "707636660214",
  appId: "1:707636660214:web:ee3fb0ec165fa9706529d7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth=getAuth();
export const storage = getStorage();
export const db=getFirestore();