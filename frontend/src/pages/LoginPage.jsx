import React, { use } from 'react'
import {Link  ,useNavigate} from 'react-router-dom'
import registerImage from '../assets/regitserimage.jpg'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';

const LoginPage = () => {
  const {login , isLoggingIn} = useAuthStore();
  const navigate = useNavigate();
  const handleSubmit = async (e) =>{
      e.preventDefault();
      const fd = new FormData(e.target);
     
      const email = fd.get("email");
      const password = fd.get("password");
    

      if( !email || !password){
        toast.error("All the fields are required!" , {
          autoClose:8000,
          pauseOnHover:true,
          draggable:true,
         
        });
        return;
      }
      const isEmailInvalid = !email.includes("@");
      if(isEmailInvalid){
        toast.error("Invalid credentials" ,{
          autoClose:8000,
          pauseOnHover:true,
          draggable:true,
      
        })
      }
      if(password.length < 6){
        toast.error("Password length should at least be six characters.", {
          autoClose:8000,
          pauseOnHover:true,
          draggable:true,
      
        });
        return;
      }

      const formData = {
        email,
        password
      }
    
      login(formData);


  }
  return (
    <div id="login-page">
      <ToastContainer></ToastContainer>
    <div id="form-section">
      <form onSubmit={handleSubmit}>
        
          
          <div className="form-control">
              <label htmlFor="">Email</label>
              <input type="email" name="email" />
          </div>
          <div className="form-control">
              <label htmlFor="">Password</label>
              <input type="password" name="password" />
          </div>
        
          <button disabled={isLoggingIn}>Submit</button>
          <span>Do not have an account ? <Link to='/signup'>Signup</Link></span>
      </form>
    </div>
    <div id="image-section">
      <img src={registerImage} alt="" />

    </div>
  </div>
  )
}

export default LoginPage
