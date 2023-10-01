// useChat.js
import { useState, useEffect } from 'react';
import { db, auth } from '../pages/Firebase'; 
import { doc, getDoc, collection, query, where, addDoc, orderBy, onSnapshot } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useAdminFlag } from '../context/AdminFlagContext';

const useChat = (memberId) => {
  const { adminFlag, isLoading,uid,displayName,tail } = useAdminFlag(); // <-- useAdminFlagで取得
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);  // 画像のURLのstate

  
  useEffect(() => {
    const messagesRef = collection(db, 'messages');
  
  // 自分が送ったメッセージ
  const q1 = query(messagesRef, 
    where('recipientId', '==', memberId), 
    where('senderId', '==', uid), 
    orderBy('timestamp'));
  
  // 自分が受け取ったメッセージ
  const q2 = query(messagesRef, 
    where('recipientId', '==', uid), 
    where('senderId', '==', memberId), 
    orderBy('timestamp'));

  let allMessages = [];

  const unsubscribe1 = onSnapshot(q1, snapshot => {
    const fetchedMessages1 = snapshot.docs.map(doc => doc.data());
    allMessages = [...allMessages, ...fetchedMessages1];
    allMessages.sort((a, b) => a.timestamp - b.timestamp); // タイムスタンプでソート
    setMessages(allMessages);
  });

  const unsubscribe2 = onSnapshot(q2, snapshot => {
    const fetchedMessages2 = snapshot.docs.map(doc => doc.data());
    allMessages = [...allMessages, ...fetchedMessages2];
    allMessages.sort((a, b) => a.timestamp - b.timestamp); // タイムスタンプでソート
    setMessages(allMessages);
  });

  return () => {
    unsubscribe1();
    unsubscribe2();
  };
}, [memberId, uid]);

     

  // Firestoreに送るための関数
  const handleSendMessage = async () => {
    if (newMessage.trim() !== "" || attachment)  {
      let imageUrl = null;
      if (attachment) {
        const storageRef = ref(getStorage(), `chat_attachments/${auth.currentUser.uid}/${Date.now()}_${attachment.name}`);
        await uploadBytesResumable(storageRef, attachment);
        // 画像のダウンロードURLを取得してimageUrlにセット
        imageUrl = await getDownloadURL(storageRef);
        setImageUrl(imageUrl);
      }
      // Firestoreにメッセージを保存
      await addDoc(collection(db, 'messages'), {
        format: 'individual',
        senderId: auth.currentUser.uid,
        recipientId: memberId,
        title: null,
        text: newMessage,
        imageUrl: imageUrl,
        timestamp: new Date()
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

  return {
    displayName,
    messages,
    newMessage,
    setNewMessage,
    handleSendMessage,
    handleAttachClick,
    imageUrl,
    setAttachment,
    adminFlag 
  };
};

export default useChat;
