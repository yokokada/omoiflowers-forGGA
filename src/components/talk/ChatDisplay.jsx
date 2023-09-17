import React from 'react';
import {MainContainer,ChatContainer,MessageList,Message,MessageInput,Avatar
} from "@chatscope/chat-ui-kit-react";
import { db, auth } from '../../pages/Firebase'; 


const ChatDisplay = ({ 
  messages, 
  currentUser, 
  displayName, 
  newMessage, 
  handleAttachClick, 
  setNewMessage, 
  handleSendMessage 
}) => {
  const isImageUrl = (text) => {
    const imageUrlPattern = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;
    return imageUrlPattern.test(text);
  };

  return (
    <MainContainer>
        <ChatContainer>
        <MessageList>
            {messages.map((msg, index) => {
              return isImageUrl(msg.text) ? (
                <Message
                  key={index}
                  type="image"
                  model={{
                    direction: msg.senderId === auth.currentUser.uid ? "outgoing" : "incoming",
                    payload: {
                      src: msg.text,
                      alt: "Attached Image",
                      width: "150px"
                    }
                  }}
                />
              ) : (
                <Message
                  key={index}
                  model={{
                    message: msg.text,
                    sentTime: new Date(msg.timestamp?.seconds * 1000).toLocaleTimeString(),
                    sender: msg.senderId === auth.currentUser.uid ? "You" : displayName,
                    position: "normal",
                    direction: msg.senderId === auth.currentUser.uid ? "outgoing" : "incoming",
                  }}
                />
              );
            })}
         </MessageList>
          <MessageInput 
          onAttachClick={handleAttachClick}
          value={newMessage}
          onChange={e => setNewMessage(e)}
          onSend={handleSendMessage}
          />
        </ChatContainer>
      </MainContainer>
  );
}

export default ChatDisplay;
