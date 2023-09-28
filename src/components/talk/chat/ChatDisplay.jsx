import React, { useContext } from 'react';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar
} from "@chatscope/chat-ui-kit-react";
import { db, auth } from '../../../pages/Firebase'; 
import '../allpost/AllPost.css';
import { ChatContext } from '../../../context/ChatContext'; // 追加

const ChatDisplay = () => {
  const {
    messages, 
    currentUser, 
    displayName, 
    newMessage, 
    handleAttachClick, 
    setNewMessage, 
    handleSendMessage 
  } = useContext(ChatContext); // 追加

  const isImageUrl = (text) => {
    const imageUrlPattern = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;
    return imageUrlPattern.test(text);
  };

  const isCardFormat = (msg) => {
    return msg.format === 'all';
  };

  const formatDateAndTime = (timestampInSeconds) => {
    const date = new Date(timestampInSeconds * 1000);
    const dateString = date.toLocaleDateString();
    const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return `${dateString} ${timeString}`;
  };

  const CustomMessage = ({ msg, direction }) => (
    <div className={`customMessageWrapper ${direction}`}>
      <div className={`customMessage ${direction}`}>
        {msg.imageUrl && (
          <div className='cardImage'>
            <img src={msg.imageUrl} alt="Uploaded content" />
          </div>
        )}
        <div className="displayArea">
          <h2>{msg.title}</h2>
          <p>{msg.text}</p>
        </div>
      </div>
      <div className="messageInfo">
      <span>{formatDateAndTime(msg.timestamp?.seconds)}</span>
      </div>
    </div>
  );
  
  return (
    <MainContainer>
      <ChatContainer>
        <MessageList>
          {messages.map((msg, index) => {
            if (isImageUrl(msg.text)) {
              return (
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
              );
            } else if (isCardFormat(msg)) {
              return (
                <CustomMessage
                  key={index}
                  msg={msg}
                  direction={msg.senderId === auth.currentUser.uid ? "outgoing" : "incoming"}
                  displayName={displayName}
                />
              );
            } else {
              return (
                <Message
                  key={index}
                  model={{
                    message: msg.text,
                    sentTime: formatDateAndTime(msg.timestamp?.seconds),
                    sender: msg.senderId === auth.currentUser.uid ? "You" : displayName,
                    sender: msg.senderId === auth.currentUser.uid ? "You" : displayName,
                    position: "normal",
                    direction: msg.senderId === auth.currentUser.uid ? "outgoing" : "incoming",
                  }}
                />
              );
            }
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
