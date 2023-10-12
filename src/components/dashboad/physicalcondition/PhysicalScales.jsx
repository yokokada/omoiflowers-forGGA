import React, { useState, useEffect } from "react";
import {Tabs, Tab, Button} from "@nextui-org/react";
import { EmojiSad,EmojiLookDown,EmojiQuite,EmojiSatisfied,EmojiBlinkRight } from "iconoir-react";
import './Physicalcondition.css'
import { doc, query, getDoc, orderBy, addDoc, collection, updateDoc , deleteDoc , where,setDoc} from 'firebase/firestore'; 
import { db } from "../../../pages/Firebase";  // あなたのFirebase設定に合わせて変更してください
import { useAdminFlag } from '../../../context/AdminFlagContext'


export default function App() {
  const [condition, setCondition] = useState("");
  const [tweet, setTweet] = useState("");
  const { adminFlag, isLoading, uid, displayName, tail, adminZeroDisplayName } = useAdminFlag(); 

  useEffect(() => {
    const fetchData = async () => {
      const today = new Date().toLocaleDateString('en-CA');
      const docId = `${uid}_${today}`;
      const docRef = doc(db, "PatientData", docId);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setCondition(docSnap.data().condition);
        setTweet(docSnap.data().tweet);
      } else {
        setCondition("");
        setTweet("");
      }
    };

    fetchData();
  }, []);

  const saveData = async () => {
    const today = new Date().toLocaleDateString('en-CA');
    const docId = `${uid}_${today}`;
    const docRef = doc(db, "PatientData", docId);
    const docSnap = await getDoc(docRef);  // <-- ここを追加

    const now = new Date();  // <-- ここを追加
    const lastUpdate = docSnap.data()?.timestamp?.toDate();  // <-- ここを追加


      if (lastUpdate?.getDate() !== now.getDate()|| !docSnap.exists()) {
        // 日付が変わっているか、データが存在しない場合は新しくデータを追加
        await setDoc(docRef, {  // <-- setDocを使ってドキュメントを新規作成または上書き
          condition: condition,
          tweet: tweet,
          timestamp: new Date()
        });
        alert("保存しました");  // ここでアラートを表示
      } else {
        await updateDoc(docRef, {
          condition: condition,
          tweet: tweet,
          timestamp: new Date()
        });
        alert("変更しました");  // ここでアラートを表示
      }
  };

   // タブの選択が変更されたときに呼び出される関数
   const handleSelectionChange = (key) => {
    // console.log("Selected tab:", key);  // デバッグ用
    setCondition(key);
  };

  const handleTweetChange = (e) => {
    setTweet(e.target.value);
  };

  const sizes = ["md"];

  return (
    <div className="physicalScaleWrap">
      <h1>{adminZeroDisplayName}さんの状況報告</h1>
      <div className="physicalScale">
        <div className='physicalScaleTitle'>
    
        </div>
        <div>
          {sizes.map((size, index) => (
            <Tabs 
            key={index} 
            size={size} 
            aria-label="Tabs sizes"
            selectedKey={condition || "title"}  // ここを修正
            onSelectionChange={handleSelectionChange} 
            >
              <Tab
              key="title"
              title="体調"
              />
              <Tab 
                key="worst" 
                title={<EmojiSad fontSize={'16px'}/>}
                />
                <Tab 
                key="bad" 
                title={<EmojiLookDown fontSize={'16px'}/>}
                />
                <Tab key="so-so" 
                title={<EmojiQuite fontSize={'16px'}/>}
                />
                <Tab 
                key="good" 
                title={<EmojiSatisfied fontSize={'16px'}/>}
                />
                <Tab 
                key="grate" 
                title={<EmojiBlinkRight fontSize={'16px'}/>}
                />
            </Tabs>
            ))}
        </div>
      </div>
      <div className="dailyTweet">
        <label htmlFor=""><p>ひと<br/>こと</p></label>
        <input type="text" value={tweet} onChange={handleTweetChange} /> 
      </div>
      <Button onClick={saveData} style={{ backgroundColor:'#1B3672', color:'white', marginTop:'10px'}}>保存/変更</Button>
    </div>
  );
}
