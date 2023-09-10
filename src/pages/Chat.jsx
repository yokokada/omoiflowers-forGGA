import React from 'react';
import TopNavbar from '../components/common/TopNavbar';
import FooterPK from '../components/common/FooterPK';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar
} from "@chatscope/chat-ui-kit-react";

const Chat = () => {
  return (
    <div>
      <TopNavbar/>
      <div style={{ position: "relative", height: "500px", marginTop:"60px"}}>
      <MainContainer>
        <ChatContainer>
          <MessageList>
            <Message
              model={{
                message: "Hello my friend",
                sentTime: "just now",
                sender: "Joe",
                position: "normal",
                direction: "incoming"
              }}
            />
          </MessageList>
          <MessageInput placeholder="Type message here" />
        </ChatContainer>
      </MainContainer>
    </div>
    <FooterPK/>

    </div>
    
  );
}

export default Chat;
