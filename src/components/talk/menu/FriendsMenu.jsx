import React, { useState, useEffect } from 'react';
import { db, auth } from '../../../pages/Firebase';  // FirestoreとAuthのインスタンスをインポート
import { collection, getDocs } from "firebase/firestore";  // Firestoreの関数をインポート

const FriendsMenu = () => {
  const [displayNameForZero, setDisplayNameForZero] = useState("本人さん"); // adminFlagが0のdisplayName
  const [displayNameForOne, setDisplayNameForOne] = useState("家族さん"); // adminFlagが1のdisplayName
  
  useEffect(() => {
    const fetchNames = async () => {
      const memberQuery = collection(db, 'users');
      const memberSnapshot = await getDocs(memberQuery);
      let memberData = memberSnapshot.docs.map(doc => doc.data());

      const nameForZero = memberData.find(member => member.adminFlag === 0)?.displayName;
      const nameForOne = memberData.find(member => member.adminFlag === 1)?.displayName;

      if (nameForZero) {
        setDisplayNameForZero(nameForZero);
      }
      if (nameForOne) {
        setDisplayNameForOne(nameForOne);
      }
    };

    fetchNames();
  }, []);

  return (
    <div className='menu' style={{ marginTop: "80px", marginBottom: "30px"}}>
      <h1 style={{ fontSize: '16px', color: '#1B3672', fontWeight: 'bold' }}>
        {displayNameForZero}さん、{displayNameForOne}さんから
        <br/>メッセージが届いている時に返信可能です。
      </h1>
    </div>
  );
}

export default FriendsMenu;
