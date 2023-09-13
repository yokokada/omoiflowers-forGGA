import React, { useState, useEffect } from 'react';
import { db, auth } from '../../pages/Firebase';  // FirestoreとAuthのインスタンスをインポート
import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";  // Firestoreの関数をインポート
import { useNavigate } from 'react-router-dom';

const Memberlist = () => {
  const [members, setMembers] = useState([]);
  const  navigate  = useNavigate();

  const handleChatWithMember = (memberId) => {
    navigate (`/chat/${memberId}`);
  };

  useEffect(() => {
    const fetchMembers = async () => {
      const currentUser = auth.currentUser;  // 現在ログインしているユーザーを取得
      if (!currentUser) return;  // ユーザーがログインしていない場合、処理を終了
      
      // ログインしているユーザーのtails IDを取得
      const userDocRef = doc(db, 'users', currentUser.uid);
      const userDocSnapshot = await getDoc(userDocRef);
      const userTailId = userDocSnapshot.data().tail;
      console.log(userTailId);

      // 取得したtailIdに属するメンバーを取得
      const memberQuery = query(
        collection(db, 'users'),
        where('tail', '==', userTailId)
      );
      const memberSnapshot = await getDocs(memberQuery);
      const memberData = memberSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMembers(memberData);
    };
    
    fetchMembers();
  }, []);

  return (
    <div>
      <h1 style={{fontSize:'20px' ,color:'#1B3672' ,marginBottom:'10px'}} >メンバーリスト</h1>
      <ul>
      {members.map(member => (
        <li key={member.id}>
          <div className="inline-flex items-center justify-center gap-4 rounded-small bg-white px-6 py-2 m-4 shadow-lg"
          onClick={() => handleChatWithMember(member.id)} >
            <span className="flex relative justify-center items-center box-border overflow-hidden align-middle z-20 w-20 h-20 text-base bg-default text-default-foreground rounded-full">
              <img 
                src={member.avatar || "デフォルトの画像のURL"} 
                alt={`${member.displayName}のアバター`} 
                className="flex object-cover w-14 h-14 transition-opacity opacity-0 rounded-full shadow-lg"
                onLoad={(e) => e.target.style.opacity = 1}
              />
            </span>
            <div className="inline-flex flex-col items-start">
              <span className="text-large text-inherit">{member.displayName}</span>
              <span className="text-base text-foreground-400">{member.email}</span>
            </div>
          </div>
        </li>
      ))}
    </ul>
    </div>
  )
}

export default Memberlist;
