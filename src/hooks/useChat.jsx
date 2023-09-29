// useChat.js
import { useState, useEffect } from 'react';
import { db, auth } from '../pages/Firebase'; 
import { doc, getDoc, collection, query, where, addDoc, orderBy, onSnapshot } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const useChat = (memberId) => {
  const [displayName, setDisplayName] = useState(""); 
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);  // 画像のURLのstate
  const [adminFlag, setAdminFlag] = useState(null);

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
    // adminFlagをFirestoreから取得する処理
    const fetchAdminFlag = async () => {
      const adminDocRef = doc(db, 'someCollection', 'someDocId'); // このパスは適切に設定してください。
      const adminDocSnapshot = await getDoc(adminDocRef);
      if (adminDocSnapshot.exists()) {
        setAdminFlag(adminDocSnapshot.data().adminFlag || 0); // adminFlagが存在しない場合はデフォルト値（ここでは0）を設定
      }
    };
    fetchAdminFlag();
  }, []); // 依存配列は適切に設定してください。

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
