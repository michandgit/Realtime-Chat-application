import React, { useEffect } from 'react'
import Left from '../Components/Left/Left'
import Right from '../Components/Right/Right'
import { useChatStore } from '../store/useChatStore'
import NoChatselected from '../Components/NoChatSelected/NoChatselected'

const Chat = () => {
  const {selectedUser} = useChatStore();

  useEffect(() => {
    useChatStore.getState().subscribeToMessages();
    return () => {
      useChatStore.getState().unsubscribeFromMessages();
    };
  }, [selectedUser]); // re-subscribe when selectedUser changes

  return (
    <div className='chat-page'>
      <Left/>
     {!selectedUser ? <NoChatselected/> : <Right/>}
      </div>
  )
}

export default Chat
