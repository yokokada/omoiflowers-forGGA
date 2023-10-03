import React, { useState, useEffect } from 'react';
import { collection, doc as docRef, getDocs, getDoc, query, where ,orderBy} from 'firebase/firestore';
import { db } from '../../pages/Firebase';
import './NotificationPage.css'
import { useAdminFlag } from '../../context/AdminFlagContext';

   

const NotificationPage = () => {
  const { adminFlag, isLoading,uid,displayName,tail } = useAdminFlag(); 
  const [omimaiNotifications, setOmimaiNotifications] = useState([]);
  const [messageNotifications, setMessageNotifications] = useState([]);
  const [clickNotifications, setClickNotifications] = useState([]);


  // 日時のカスタムフォーマット関数
const customFormatDate = (date) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
  return date.toLocaleDateString(undefined, options);
};

// 通知を日付でソートする関数
const sortByDate = (notifications) => {
  return notifications.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
};

    useEffect(() => {
      const fetchNotifications = async () => {
        try {
          const fetchedOmimai = [];
        
  
          // お見舞いに関するお知らせ
          const scheduleQuery = query(collection(db, 'schedules'), where('omimai', '==', 'on'));
          const scheduleSnapshot = await getDocs(scheduleQuery);
          scheduleSnapshot.forEach(doc => {
            const data = doc.data();
            fetchedOmimai.push({
              message: 'お見舞いOKの通知があります。',
              timestamp: customFormatDate(data.timestamp?.toDate())
            });
          });
          setOmimaiNotifications(fetchedOmimai);
  
          // メッセージに関するお知らせ
const messageQuery = query(collection(db, 'messages'), where('recipientId', '==', uid));
const messageSnapshot = await getDocs(messageQuery);

// メッセージのdisplayNameを非同期で取得
const fetchedMessages = await Promise.all(
  messageSnapshot.docs.map(async (messageDoc) => {  // docをmessageDocと改名
    const data = messageDoc.data();
    
    // ユーザーのドキュメントをuidで直接参照
    const userDocRef = docRef(db, 'users', data.senderId);
    
    // ドキュメントのデータを取得
    const userDoc = await getDoc(userDocRef);
    
    let senderData = {};

    if (userDoc.exists()) {
      senderData = userDoc.data();
    } else {
      console.warn(`Sender with uid ${data.senderId} not found.`);
    }

    return {
      message: `${senderData.displayName}さんからのメッセージが届きました`,
      timestamp: customFormatDate(data.timestamp?.toDate()),
    };
  })
);

setMessageNotifications(fetchedMessages);

  
// クリック数に関するお知らせ
const clicksQuery = query(
  collection(db, 'clicks'), 
  where('clickNumber', '>=', 250),  // 250以上のclickNumberを持つドキュメントのみを対象とする
  orderBy('clickNumber', 'desc')  // clickNumberに基づいて降順に並べる
);
const clicksSnapshot = await getDocs(clicksQuery);

const fetchedClicks = [];

clicksSnapshot.forEach(doc => {
  const clickData = doc.data();
  if (clickData.clickNumber % 250 === 0) {  // クリック数が250の倍数である場合
    fetchedClicks.push({
      message: `${clickData.clickNumber}クリックに到達しました！`,
      timestamp: customFormatDate(clickData.clickedAt?.toDate())  // ここを修正
    });
  }
});

setClickNotifications(fetchedClicks);

          // console.log("UID: ", uid);
          // console.log("Omimai Notifications: ", fetchedOmimai);
          // console.log("Message Notifications: ", fetchedMessages);
          // console.log("Click Notifications: ", fetchedClicks);

                  // ソート処理を行い、状態を更新
        setOmimaiNotifications(sortByDate(fetchedOmimai));
        setMessageNotifications(sortByDate(fetchedMessages));
        setClickNotifications(sortByDate(fetchedClicks));
  
        } catch (error) {
          console.error("Error fetching notifications: ", error);
        }
      };

    
  
      fetchNotifications();
      
    }, []);
  
    return (
      <div className="notification-container">
        <h2 className="notification-title">お知らせ</h2>

        <div className="notification-zone">
          <h3>メッセージ通知</h3>
          {renderNotifications(messageNotifications)}
        </div>
  
        <div className="notification-zone">
          <h3>お見舞い通知</h3>
          {renderNotifications(omimaiNotifications)}
        </div>
  
        <div className="notification-zone">
          <h3>クリック数通知</h3>
          {renderNotifications(clickNotifications)}
        </div>
      </div>
    );
  };
  
  const renderNotifications = (notifications) => {
    return notifications.length > 0 ? (
      <ul className="notification-list">
        {notifications.map((notif, index) => (
          <li key={index} className="notification-item">
            {notif.message}<br/>{notif.timestamp}
          </li>
        ))}
      </ul>
    ) : (
      <p>新しいお知らせはありません。</p>
    );
  };

  
export default NotificationPage;
  