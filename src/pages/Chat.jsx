import React , { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TopNavbar from '../components/common/TopNavbar';
import FooterPK from '../components/common/FooterPK';
import { NavArrowLeft } from 'iconoir-react';
import {MainContainer,ChatContainer,MessageList,Message,MessageInput,Avatar
} from "@chatscope/chat-ui-kit-react";
import { useNavigate } from 'react-router-dom';
import { db, auth } from './Firebase'; 
import { doc, getDoc } from 'firebase/firestore'; 

const Chat = () => {
  const { memberId } = useParams();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState(""); 
  console.log("Member ID:", memberId);
  console.log("displayName");

  useEffect(() => {
    const fetchDisplayName = async () => {
      const userDocRef = doc(db, 'users', memberId);
      const userDocSnapshot = await getDoc(userDocRef);
      if (userDocSnapshot.exists()) {
        setDisplayName(userDocSnapshot.data().displayName || "");
      }
    };
    fetchDisplayName();
  }, [memberId]);
  
  return (
    <div>
      <TopNavbar/>
      <div style={{ position: "relative", height: "500px", marginTop:"60px"}}>
        <div style={{ display:'flex'}}>
        <button style={{ display:'flex' ,marginBottom:'2px'}} onClick={() => navigate('/talks')}>
        <NavArrowLeft fontSize={26} strokeWidth={1} color='#1B3672' style={{ marginLeft: '12px' }} />
        </button>
        <div style={{ fontSize:'20px',marginTop:'5px', color:'#1B3672'}}>
        {displayName && <span style={{ marginLeft: '8px' }}>{displayName}さんとのChat</span>}
        </div>
        </div>
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
