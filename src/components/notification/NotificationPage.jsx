import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../pages/Firebase';
import './NotificationPage.css'

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const fetchedNotifications = [];

      // メッセージに関するお知らせ
      const messageQuery = query(collection(db, 'messages'), where('recipient', '==', '自分のユーザーID'));
      const messageSnapshot = await getDocs(messageQuery);
      messageSnapshot.forEach(doc => {
        const data = doc.data();
        fetchedNotifications.push({
          message: `新しいメッセージがあります: ${data.message}`,
          timestamp: data.timestamp?.toDate().toLocaleString()  // タイムスタンプをローカル時間の文字列に変換
        });
      });
   
    // クリック数に関するお知らせ
    const clicksSnapshot = await getDocs(collection(db, 'clicks'));
    // 最新のドキュメントを取得
    const latestClickDoc = clicksSnapshot.docs[clicksSnapshot.docs.length - 1];
    const clickData = latestClickDoc.data();

    // 250の倍数ごとに通知を生成
    for(let i = 250; i <= clickData.count; i += 250) {
    fetchedNotifications.push({
        message: `ボタンが${i}クリックに到達しました！`,
        timestamp: clickData.timestamp?.toDate().toLocaleString()
    });
    }
    
      // お見舞いOKに関するお知らせ
      const scheduleQuery = query(collection(db, 'schedules'), where('omimai', '==', 'on'));
      const scheduleSnapshot = await getDocs(scheduleQuery);
      scheduleSnapshot.forEach(doc => {
        fetchedNotifications.push({
          message: 'お見舞いOKの通知があります。',
          timestamp: doc.data().timestamp?.toDate().toLocaleString()  // タイムスタンプをローカル時間の文字列に変換
        });
      });

      // 通知を新しいものが上にくるようにソート
    fetchedNotifications.sort((a, b) => {
        const dateA = new Date(a.timestamp);
        const dateB = new Date(b.timestamp);
        return dateB - dateA;
      });

      setNotifications(fetchedNotifications);
    };

    fetchNotifications();
  }, []);


  return (
    <div className="notification-container">
      <h2 className="notification-title">お知らせ</h2>
      {notifications.length > 0 ? (
        <ul className="notification-list">
          {notifications.map((notif, index) => (
            <li key={index} className="notification-item">
              {notif.message} - {notif.timestamp}
            </li>
          ))}
        </ul>
      ) : (
        <p>新しいお知らせはありません。</p>
      )}
    </div>
  );
};

export default NotificationPage;
