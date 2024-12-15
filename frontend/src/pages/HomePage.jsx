import React from "react";
import { useChatStore } from "../store/useChatStore";
import Sidebar from "../Components/Sidebar.jsx";
import NoChatSelected from "../Components/NoChatSelected.jsx";
import ChatContainer from "../Components/ChatContainer.jsx";

const HomePage = () => {
  const { selectedUser } = useChatStore();
  return (
    <div className="h-screen bg-base-200 flex items-center justify-center pt-20">
      <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
        <div className="flex h-full rounded-lg overflow-hidden">
          <Sidebar />
          {/* Like WA if selected, show the chats of the user else not */}
          {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
