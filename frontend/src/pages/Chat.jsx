import React from 'react'
import Left from '../Components/Left/Left'
import Right from '../Components/Right/Right'
import { useChatStore } from '../store/useChatStore'
import NoChatselected from '../Components/NoChatSelected/NoChatselected'

const Chat = () => {
  const {selectedUser} = useChatStore();
  return (
    <div className='chat-page'>
      <Left/>
     {!selectedUser ? <NoChatselected/> : <Right/>}
      </div>
  )
}

export default Chat
