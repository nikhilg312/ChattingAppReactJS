import React from 'react'
import { useState } from 'react'
import {signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Firebase';
import { useNavigate,Link } from 'react-router-dom';
export default function Login() {
  const [err, setErr] = useState(false)
  const navigate = useNavigate()
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const email=e.target[0].value;
    const password=e.target[1].value;
    try{
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    }
    catch(err){
      setErr(true);
    }
  };
  return (
    <div className='formContainer'>
      <div className="formWrapper">
        <span className="logo">Capstone Chat</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder='email' />
          <input type="password" placeholder='password' />
          <button>Login</button>
          {err && <span>Wrong ID or Password</span>}
        </form>
        <p>Don't have an Account?<Link to="/register">SignUp</Link> </p>
      </div>
    </div>
  )

 
}