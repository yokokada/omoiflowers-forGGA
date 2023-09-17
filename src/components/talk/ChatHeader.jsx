import React, { useState, useEffect } from 'react';
import { NavArrowLeft } from 'iconoir-react';
import { db } from '../../pages/Firebase'; 
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const ChatHeader = ({ memberId }) => {  // memberId を props として受け取るように変更
  const [displayName, setDisplayName] = useState(""); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDisplayName = async () => {
      if (!memberId) return;  // memberIdが存在しない場合は即座に終了

      const userDocRef = doc(db, 'users', memberId);
      const userDocSnapshot = await getDoc(userDocRef);
      if (userDocSnapshot.exists()) {
        setDisplayName(userDocSnapshot.data().displayName || "");
      }
    };

    fetchDisplayName();
  }, [memberId]);

  return (
    <div style={{ display:'flex'}}>
      <button style={{ display:'flex', marginBottom:'2px' }} onClick={() => navigate('/talks')}>
        <NavArrowLeft fontSize={16} strokeWidth={2} color='#1B3672' style={{ marginLeft: '12px' }} />
      </button>
      <div style={{ fontSize:'16px', color:'#1B3672', fontWeight:'bold' }}>
        {displayName && <span style={{ marginLeft: '8px' }}>{displayName}さんとのChat</span>}
      </div>
    </div>
  )
}

export default ChatHeader;

