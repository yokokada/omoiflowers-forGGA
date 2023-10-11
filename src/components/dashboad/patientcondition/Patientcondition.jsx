import React, { useState, useEffect } from 'react'
import './patientcondition.css'
import { doc,getDoc} from 'firebase/firestore'; 
import { db } from "../../../pages/Firebase";  // あなたのFirebase設定に合わせて変更してください
import { useAdminFlag } from '../../../context/AdminFlagContext'
import { EmojiSad,EmojiLookDown,EmojiQuite,EmojiSatisfied,EmojiBlinkRight } from "iconoir-react";


const Patientcondition = () => {
    const [condition, setCondition] = useState(null);
    const [tweet, setTweet] = useState('');
    const { adminFlag, isLoading, uid, displayName, tail, adminZeroDisplayName,adminZeroId } = useAdminFlag(); 

    useEffect(() => {
        const fetchData = async () => {
          const docRef = doc(db, "PatientData",adminZeroId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            const now = new Date();
            const lastUpdate = data.timestamp.toDate();
    
            // 日付が同じ場合のみデータをセット
            if (lastUpdate.getDate() === now.getDate() &&
                lastUpdate.getMonth() === now.getMonth() &&
                lastUpdate.getFullYear() === now.getFullYear()) {
              setCondition(data.condition);
              setTweet(data.tweet);
            } else {
              // 日付が違う場合はデータをリセット
              setCondition(null);
              setTweet('');
            }
          }
        };

        fetchData();
      }, [adminZeroId]);
    
      const renderIcon = () => {
        switch (condition) {
          case 'worst':
            return <EmojiSad fontSize={'24px'} />;
          case 'bad':
            return <EmojiLookDown fontSize={'24px'} />;
          case 'so-so':
            return <EmojiQuite fontSize={'24px'} />;
          case 'good':
            return <EmojiSatisfied fontSize={'24px'} />;
          case 'grate':
            return <EmojiBlinkRight fontSize={'24px'} />;
          default:
            return <span className="info">情報<br/>なし</span>;
        }
      }

  return (
    <div className='patientConditionWrap'>
      <h1>{adminZeroDisplayName}さんの今日の調子</h1>
      <div className='patientCondition'>
        <div className='patientIcon'>
            {renderIcon()}
        </div>
        <div className='patientTweet'>
            <p>{tweet ? `${tweet}` : 'ひとことはありません'}</p>
        </div>
      </div>
      
     
      
    </div>
  )
}

export default Patientcondition
