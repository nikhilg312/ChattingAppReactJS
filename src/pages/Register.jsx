import React from 'react'
import Add from "../img/addAvatar.png"
import {createUserWithEmailAndPassword ,updateProfile} from "firebase/auth";
import {auth,db} from '../Firebase'
import {useState } from 'react';
import {storage} from '../Firebase'
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {doc, setDoc } from "firebase/firestore"; 
import { Link, useNavigate } from 'react-router-dom';
export default function Register() {
  const [err, setErr] = useState(false)
  const navigate = useNavigate()
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const displayName=e.target[0].value;
    const email=e.target[1].value;
    const password=e.target[2].value;
    const file=e.target[3].files[0];
    try{
      const res= await createUserWithEmailAndPassword(auth, email, password)
      const storageRef =ref(storage,displayName);
      const uploadTask = uploadBytesResumable(storageRef,file);
      uploadTask.on('state_changed', 
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        }, 
        (error) => {
          setErr(true);
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user,{
              displayName,
              photoURL:downloadURL,
            });
            await setDoc(doc(db,"users",res.user.uid),{
              uid:res.user.uid,
              displayName,
              email,
              photoURL:downloadURL,
            });
            await setDoc(doc(db,"userChats",res.user.uid),{
              
            });
            navigate("/")
          });
        }
      );
      
    }
    catch(err){
      setErr(true);
    }
  }
  return (
    <div className='formContainer'>
        <div className="formWrapper">
            <span className="logo">Capstone Chat</span>
            <span className="title">Register</span>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='display name'/>
                <input type="email" placeholder='email'/>
                <input type="password" placeholder='password'/>
                <input type="file" style={{display:"none"}}id="file"/>
                <label htmlFor="file">
                    <img src={Add}alt="" />
                    <span>Add An Avatar</span>
                </label>
                <button>Sign-Up</button>
                {err && <span>Something Went Wrong!! {err}</span>}
            </form>
            <p>Do You have an Account? <Link to="/login">Login</Link></p>
        </div>
    </div>
  )
}
