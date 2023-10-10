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
            setCondition(docSnap.data().condition);
            setTweet(docSnap.data().tweet);
          }
        };
    
        fetchData();
      }, [uid]);
    
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
            return <span>情報なし</span>;
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
