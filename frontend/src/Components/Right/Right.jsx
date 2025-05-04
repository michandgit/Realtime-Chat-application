import React, { useEffect, useRef,useState } from 'react'
import './Right.css'
import avatarImg from '../../assets/user.png'
import { IoSendSharp } from "react-icons/io5";
import { useChatStore } from '../../store/useChatStore';
import { useAuthStore } from '../../store/useAuthStore';
import { CiImageOn } from "react-icons/ci";
import { toast } from 'react-toastify';
import { CiCircleRemove } from "react-icons/ci";
import { formatMessageTime } from '../../lib/utils';




const Right = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const {messages, getMessages, isMessagesLoading,selectedUser,setSelectedUser,subscribeToMessages,
    unsubscribeFromMessages, sendMessages } = useChatStore();
  const {onlineUsers} = useAuthStore();
  const { authUser} = useAuthStore();
  const messageEndRef = useRef(null);
  
  useEffect(()=>{
      getMessages(selectedUser._id); 
      subscribeToMessages();

      return () => unsubscribeFromMessages();
  },[selectedUser._id,getMessages, subscribeToMessages, unsubscribeFromMessages])

  useEffect(()=>{
    if(messageEndRef.current && messages){
      messageEndRef.current.scrollIntoView({behavior: "smooth"})
    }
  },[messages])

  const handleImageChange = (e) =>{
    const file = e.target.files[0];
    if(!file.type.startsWith("image/")){
      toast.error("Please select an image file");
      
    }

    const reader = new FileReader();
    reader.onloadend = () =>{
      setImagePreview(reader.result);
    }
    reader.readAsDataURL(file);
  }

  const removeImage = () =>{
    setImagePreview(null);
    if(fileInputRef.current) fileInputRef.current.value="";
  }


  const handleSendMessage = async (e)=>{
    e.preventDefault();
    if(!text.trim() && !imagePreview){
      return;
    }

    try {
      await sendMessages({
        text: text.trim(),
        image: imagePreview,
      });
      setText("");
      setImagePreview(null);
      if(fileInputRef.current)fileInputRef.current.value="";
    } catch (error) {
      console.error("Failed to send message: ",error);
    }
  }

  if(isMessagesLoading){
    return <div>Loading...</div>
  }

  return (
    <div className='right'>
      <div className="bio-section">
        <img src={selectedUser.profilePic || avatarImg} alt={selectedUser.fullName} />
        <div className="info">
          <span id="name">{selectedUser.fullName}</span>
          <span id="status">{onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"  }</span>
        </div>
      </div>

      <div className="chat-section">

        {
          messages.map((message) =>(
            <div key={message._id}
            ref={messageEndRef}
            className={`message ${message.senderId === authUser._id ? "sender" : "receiver"}`}
            >
             
              {message.image &&  <img id="messageImg" src={message.image} alt="Attachment"/>}
              {message.text && <p>{message.text}</p>}
              <span> <time >{formatMessageTime(message.createdAt)}</time></span>
              </div>
          ))
        }

      </div>
      <div className="inp-message">
  {imagePreview && (
    <div className="previewImg">
      <img src={imagePreview} alt="Preview" />
      <button onClick={removeImage}><CiCircleRemove /></button>
    </div>
  )}
  
  <form onSubmit={handleSendMessage} className="form-container">
    <div className="input-wrapper">
      <input
        type="text"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="icons">
        <button type="button" onClick={() => fileInputRef.current?.click()}>
          <CiImageOn size={22} style={{ color: "#555" }} />
        </button>
        <button type="submit" disabled={!text.trim() && !imagePreview}>
          <IoSendSharp size={22} style={{ color: "#555" }} />
        </button>
      </div>
    </div>
    <input
      type="file"
      accept="image/*"
      ref={fileInputRef}
      className="hidden"
      onChange={handleImageChange}
    />
  </form>
</div>

      
    </div>
  )
}

export default Right
