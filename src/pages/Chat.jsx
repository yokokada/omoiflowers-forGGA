import React from 'react';
import { useParams } from 'react-router-dom';
import TopNavbar from '../components/common/TopNavbar';
import FooterPK from '../components/common/FooterPK';
import ChatDisplay from '../components/talk/chat/ChatDisplay';
import ChatHeader from '../components/talk/chat/ChatHeader';
import useChat from '../hooks/useChat';
import { ChatContext }from '../context/ChatContext';

const Chat = () => {
  const { memberId } = useParams();
  const chatState = useChat(memberId);

  return (
    <div>
      <TopNavbar/>
      <div style={{ position: "relative", height: "500px", marginTop: "80px" }}>
        <ChatHeader memberId={memberId} />
        <ChatContext.Provider value={chatState}>
          <ChatDisplay />
        </ChatContext.Provider>
      </div>
      <FooterPK/>
    </div>
  );
};

export default Chat;
