import React, { useEffect, useState } from 'react'
import './App.css'
import Chat from './pages/Chat'
import Register from './pages/Register'
import { BrowserRouter ,Routes,Route, Navigate} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import { useAuthStore } from './store/useAuthStore'
import { Loader } from 'lucide-react'
import Profile from './pages/Profile'
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';


const App = () => {
  


  const {authUser , checkAuth, isCheckingAuth, onlineUsers} = useAuthStore();


  useEffect(()=>{
    checkAuth();
  },[checkAuth]);
  console.log(authUser);
  console.log("onlineUsers: ",onlineUsers)



  if(isCheckingAuth && !authUser){
    return (
      <div className='loader-container'>
        <Loader className='spinner' size={64}></Loader>
      </div>
    )
  }
  return (
    <>
   
     <BrowserRouter>
   
    <Routes> 
      <Route path="/signup" element={!authUser ? <Register/> :<Navigate to="/" /> } />
      <Route path="/login" element={!authUser ? <LoginPage/> : <Navigate to="/" />} />
      <Route path="/" element={authUser ? <Chat/> : <Navigate to="/login" />} />
      <Route path="/profile" element={<Profile/>}/>
    </Routes>

   

    </BrowserRouter>
    <ToastContainer 
        position="top-right"
        autoClose={3000} 
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

    
    </>
   
  

  
  )
}

export default App
