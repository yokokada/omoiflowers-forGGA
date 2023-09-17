import React, { useState, useEffect } from 'react';
import { db, auth } from '../../pages/Firebase';  // FirestoreとAuthのインスタンスをインポート
import { collection, getDocs } from "firebase/firestore";  // Firestoreの関数をインポート
import { useNavigate } from 'react-router-dom';
import "./Memberlist.css"
import {Avatar} from "@nextui-org/react";

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
      
      // // ログインしているユーザーのtails IDを取得
      // const userDocRef = doc(db, 'users', currentUser.uid);
      // const userDocSnapshot = await getDoc(userDocRef);
      // const userTailId = userDocSnapshot.data().tail;
      // console.log(userTailId);

    //   // 取得したtailIdに属するメンバーを取得
    //   const memberQuery = query(
    //     collection(db, 'users'),
    //     where('tail', '==', userTailId)
    //   );
    //   const memberSnapshot = await getDocs(memberQuery);
    //   const memberData = memberSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    //   setMembers(memberData);
    // };
    // すべてのユーザーを取得する新しいクエリ
    const memberQuery = collection(db, 'users');
    const memberSnapshot = await getDocs(memberQuery);
    let memberData = memberSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    // 名前でソート
    memberData.sort((a, b) => a.displayName.localeCompare(b.displayName, 'ja'));
    // 現在のユーザーをリストの先頭に移動
    const currentUserIndex = memberData.findIndex(member => member.id === currentUser.uid);
    if (currentUserIndex > 0) {
      const currentUserData = memberData.splice(currentUserIndex, 1)[0];
      memberData.unshift(currentUserData);
    }

    setMembers(memberData);
  };
    
    fetchMembers();
  }, []);

  return (
    <div>
      <h1 className="member-header">メンバーリスト</h1>
      <ul>
      {members.map(member => (
        <li key={member.id}>
          <div className="member-item"
          onClick={() => handleChatWithMember(member.id)} >
            <span className="member-avatar">
            { member.avatar ? (
            <img 
              src={member.avatar} 
              alt={`${member.displayName}のアバター`} 
              className="member-image"
              onLoad={(e) => e.target.style.opacity = 1}
            />
            ) : (
            <Avatar size="140px" color="#DDDDDD" />
            )
            }
            </span>
            <div className="member-detail">
              <span className="member-name">{member.displayName}</span>
              {/* <span className="member-email">{member.email}</span> */}
            </div>
          </div>
        </li>
      ))}
    </ul>
    </div>
  )
}

export default Memberlist;
