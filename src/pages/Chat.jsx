import React , { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TopNavbar from '../components/common/TopNavbar';
import FooterPK from '../components/common/FooterPK';
import { db, auth } from './Firebase'; 
import { doc, getDoc, collection, query, where, addDoc, orderBy, onSnapshot } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import ChatDisplay from '../components/talk/chat/ChatDisplay';
import ChatHeader from '../components/talk/chat/ChatHeader';


const Chat = () => {
  const { memberId } = useParams();
  const [displayName, setDisplayName] = useState(""); 
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [attachment, setAttachment] = useState(null);

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

  useEffect(() => {
    const messagesRef = collection(db, 'messages');
    const q = query(messagesRef, where('recipientId', '==', memberId), orderBy('timestamp'));
    const unsubscribe = onSnapshot(q, snapshot => {
      const fetchedMessages = snapshot.docs.map(doc => doc.data());
      setMessages(fetchedMessages);
    });
    return () => unsubscribe();
  }, [memberId]);

  const handleSendMessage = async () => {
    if (newMessage.trim() !== "" || attachment)  {
      let imageUrl = null;
      if (attachment) {
        const storageRef = ref(getStorage(), `chat_attachments/${auth.currentUser.uid}/${Date.now()}_${attachment.name}`);
        const uploadTask = await uploadBytesResumable(storageRef, attachment);
        // 画像のダウンロードURLを取得
      imageUrl = await getDownloadURL(storageRef);
    }
     // Firestoreにメッセージを保存
      await addDoc(collection(db, 'messages'), {
        senderId: auth.currentUser.uid,
        recipientId: memberId,
        text: newMessage,
        imageUrl: imageUrl, // 画像のURLを追加
        timestamp: new Date(),
      });
      setNewMessage('');
      setAttachment(null); // 添付ファイルをクリア
    }
  };

  const handleAttachClick = async () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
  
    fileInput.onchange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        setAttachment(file);
      }
    };
  
    fileInput.click();
  };

  const isImageUrl = (text) => {
    // 画像のURLかどうかをチェックする正規表現
    const imageUrlPattern = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;
    return imageUrlPattern.test(text);
  };

  
  return (
    <div>
      <TopNavbar/>
      <div style={{ position: "relative", height: "500px", marginTop:"80px"}}>
      <ChatHeader memberId={memberId}  />
        <ChatDisplay 
          messages={messages} 
          currentUser={auth.currentUser} 
          displayName={displayName}
          newMessage={newMessage}
          handleAttachClick={handleAttachClick}
          setNewMessage={setNewMessage}
          handleSendMessage={handleSendMessage}
          />
    </div>
    <FooterPK/>
    </div> 
  );
}

export default Chat;
