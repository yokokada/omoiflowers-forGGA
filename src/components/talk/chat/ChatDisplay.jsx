import React, { useContext } from 'react';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageGroup,
  MessageInput,
  MessageSeparator,
  Avatar
} from "@chatscope/chat-ui-kit-react";
import { db, auth } from '../../../pages/Firebase'; 
import './Chat.css';
import { ChatContext } from '../../../context/ChatContext'; // 追加
import { useAdminFlag } from '../../../context/AdminFlagContext';


const ChatDisplay = () => {
  const {
    messages, 
    currentUser, 
    displayName, 
    newMessage, 
    handleAttachClick, 
    setNewMessage, 
    handleSendMessage,
  } = useContext(ChatContext); // 追加

  const { adminFlag} = useAdminFlag(); // <-- useAdminFlagで取得

  if (!auth.currentUser) {
    return null;  // auth.currentUserがnullの場合、何も描画しない
  }

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

  const canEditMessage = (timestampInSeconds) => {
    const currentTime = Math.floor(Date.now() / 1000); // 現在のUNIXタイムスタンプ（秒）
    return (currentTime - timestampInSeconds) <= 300; // 5分以内（300秒）かどうか
  };

  // 最後のメッセージが存在し、その送信者が相手ならば、送信欄を表示する。
const isLastMessageFromOther = messages.length > 0 && messages[messages.length - 1].senderId !== (auth.currentUser ? auth.currentUser.uid : null);
 // adminFlagが3で、かつメッセージの数が1より大きく、最後のメッセージが相手からでない場合にtrueになる
const hideMessageInputForAdmin = adminFlag === 3 && messages.length > 0 && !isLastMessageFromOther;

let lastDate = null;  // 最後に表示した日付を保持する変数

  const CustomMessage = ({ msg, direction }) => (
    <div className={`chatCustomMessageWrapper ${direction}`}>
      <div className={`chatCcustomMessage ${direction}`}>
      <div className="chatCardWrapper"> {/* このdivが新しい親要素です */}
        {msg.imageUrl && (
          <div className='chatCardImage'>
            <img src={msg.imageUrl} alt="Uploaded content" />
          </div>
        )}
        <div className="chatDisplayArea">
          <h2>{msg.title}</h2>
          <p>{msg.text}</p>
        </div>
      </div>
      <div className="messageInfo">
      {/* <span>{formatDateAndTime(msg.timestamp?.seconds)}</span> */}
      </div>
      </div>
    </div>
  );
  
  return (
    <MainContainer>
      <ChatContainer>
        <MessageList>
          {messages.map((msg, index) => {
            const sentTime = formatDateAndTime(msg.timestamp?.seconds);
            const direction = msg.senderId === auth.currentUser.uid ? "outgoing" : "incoming";
  
            // タイムスタンプから日付を取得
            const currentDate = new Date(msg.timestamp?.seconds * 1000).toLocaleDateString();
  
            // 前のメッセージと日付が違ったらMessageSeparatorを表示
            const shouldShowSeparator = lastDate !== currentDate;
            lastDate = currentDate;  // 最後に表示した日付を更新

            const isCurrentLastMessageFromOther = (index === messages.length - 1) && msg.senderId !== auth.currentUser.uid;

  
            return (
              <React.Fragment key={index}>
                {shouldShowSeparator && <MessageSeparator>{currentDate}</MessageSeparator>}
                <MessageGroup 
                  key={index} 
                  direction={direction} 
                  sender={direction === "outgoing" ? "You" : displayName}
                  style={{ textAlign: 'left' }}
                >
                  <MessageGroup.Messages>
                    {isImageUrl(msg.text) ? (
                      <Message
                        model={{
                          message: msg.text,
                          sentTime: sentTime,
                          sender: direction === "outgoing" ? "You" : displayName,
                          position: "normal",
                          direction: direction,
                          coment:'編集',
                        }}
                      />
                    ) : isCardFormat(msg) ? (
                      <CustomMessage
                        msg={msg}
                        direction={direction}
                        displayName={displayName}
                      />
                    ) : (
                      <Message
                        model={{
                          message: msg.text,
                          sentTime: sentTime,
                          sender: direction === "outgoing" ? "You" : displayName,
                          position: "normal",
                          direction: direction,
                        }}
                      />
                    )}
                    {
                   (msg.senderId !== auth.currentUser.uid) || // 現在のメッセージが自分からのものでない
                   isCurrentLastMessageFromOther || // 最後のメッセージが相手からのものである
                   (messages[index + 1] && messages[index + 1].senderId === auth.currentUser.uid) ||  // 次のメッセージが自分からのものである
                   !canEditMessage(msg.timestamp?.seconds)  // 5分以上経過している
                   ?
                   null
                   :
                   (
                        <Message.Footer className={`messageGroupFooter-${direction}`}>
                        {sentTime}
                        <button style={{}}>編集</button>
                      </Message.Footer>
                      )}
                  </MessageGroup.Messages>
                 
                </MessageGroup>
                </React.Fragment>
            );
          })}
        </MessageList>
        {!hideMessageInputForAdmin && (
          <MessageInput 
            onAttachClick={handleAttachClick}
            value={newMessage}
            onChange={e => setNewMessage(e)}
            onSend={handleSendMessage}
            style={{ textAlign: 'left' }}
          />
        )}
      </ChatContainer>
    </MainContainer>
  );
  
}

export default ChatDisplay;
