import { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, query, orderBy, Timestamp} from 'firebase/firestore';
import { auth , db} from '../pages/Firebase'; 

const UseFirebaseClickHistory = ( ) => {
// ーーーーーー最初の状態をuseStateで定義ーーーーーーーーーーーーーーーーーーーー
    const [clickHistory, setClickHistory] = useState([]);
    const [count, setCount] = useState(0);
    const [userDisplayName, setUserDisplayName] = useState(null);
    const [countdown, setCountdown] = useState(0); // カウントダウンの状態
    const [lastClicked, setLastClicked] = useState(null); // 最後のクリックの状態
    const [userId, setUserId] = useState(null); // ユーザーのuidを保持する状態

// ーーーーーーuseEffect関連コードーーーーーーーーーーーーーーーーーーーーーーー   
// ユーザー名を取得するための useEffect
useEffect(() => {
    const user = auth.currentUser;
    if (user) {
        setUserDisplayName(user.displayName);
        setUserId(user.uid); // uidを状態にセット
    }
    const unsubscribe = auth.onAuthStateChanged((user) => {
        console.log("User state changed: ", user);
        if (user) {
            setUserDisplayName(user.displayName);
            setUserId(user.uid); // この行を追加
        } else {
            // ログアウトした時やログイン状態がない時の処理をここに書く
            setUserDisplayName(null);
            setUserId(null); // ユーザーがログアウトした場合、uidの状態をnullに設定
        }
    });
    return () => unsubscribe();
}, []);

// ローカルストレージから最後のクリックの日時を読み込むuseEffect
useEffect(() => {
    const lastClickedStr = localStorage.getItem('lastClicked');
    if (lastClickedStr) {
        const lastClickedDate = new Date(lastClickedStr);
        const now = new Date();
        const diffInSeconds = Math.round((now - lastClickedDate) / 1000);
        if (diffInSeconds < 60) {
            setCountdown(60 - diffInSeconds);
            setLastClicked(lastClickedDate);
        }
    }
}, []);

// Firestoreからのクリック履歴のリアルタイム読み込みuseEffect
useEffect(() => {
    const clickCollection = collection(db, 'clicks');
    const orderedClickQuery = query(clickCollection, orderBy('clickNumber', 'desc'));
    const unsubscribe = onSnapshot(orderedClickQuery, (snapshot) => {
    const newHistory = [];
        let latestClickCount = count;
        snapshot.docs.forEach(doc => {
            const data = doc.data();
            newHistory.push({
                ...data,
                docId: doc.id  // ドキュメントIDを追加
                });
        if(data.clickNumber > latestClickCount) {
                    latestClickCount = data.clickNumber;
             }
        });
            // データベースのデータと現在の状態が異なる場合のみ、状態を更新
            if (clickHistory.length !== newHistory.length || count !== latestClickCount) {
                setClickHistory(newHistory);
                setCount(latestClickCount);
            }
        });
    return () => unsubscribe();
    }, [ db,clickHistory.length, count,countdown,setCountdown,]);

    const recordClick = async (newCount, currentDate) => {
        const timestamp = Timestamp.fromDate(currentDate);
        // firestoreにデータを追加
        const clickData = {
            uid: userId, // uidをデータに追加
            displayName: userDisplayName,
            clickedAt: timestamp,
            clickNumber: newCount
        };
        // 最後のクリックの日時をローカルストレージに保存
        localStorage.setItem('lastClicked', currentDate.toString());
    
        try {
            const docRef = await addDoc(collection(db, 'clicks'), clickData);
            // console.log("Document written with ID:", docRef.id);
            setClickHistory(prevHistory => [...prevHistory, clickData]);
            setCount(newCount);
        } catch (error) {
            console.error("Error adding document:", error);
        }
    };

  return  { clickHistory, userDisplayName, userId, count, recordClick,setCountdown,countdown }
  
};

export default UseFirebaseClickHistory
