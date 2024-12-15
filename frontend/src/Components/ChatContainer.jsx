import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import ChatHeader from './ChatHeader.jsx';
import MessageInput from './MessageInput.jsx';
import MessageSkeleton from './skeletons/MessageSkeleton.jsx';

const ChatContainer = () => {
  //fetch the messages
  const {messages, getMessages, isMessagesLoading, selectedUser} = useChatStore();
  
  //we fetch the messages by, which current user is selected
  useEffect(() => {
    getMessages(selectedUser._id)   //select the user by id 
  },[selectedUser._id, getMessages]);
  
  //msg skeleton loading 
  if(isMessagesLoading) {
    return (
      <div className="flex flex-1 flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col overflow-auto">
      <ChatHeader />

      <p>messages...</p>

      <MessageInput/>
    </div>
  )
}

export default ChatContainer
