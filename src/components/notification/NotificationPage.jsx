import { collection, doc, getDocs, getDoc, query, where, orderBy } from 'firebase/firestore';
import { db } from '../../pages/Firebase';
import './NotificationPage.css'
import { useAdminFlag } from '../../context/AdminFlagContext';
import CustomModal from '../common/CustomModal';  // 必要なインポート
import Countdown from '../dashboad/countdown/Countdown';
import useFirebaseClickHistory from '../../hooks/UseFirebaseClickHistory';
import '../dashboad/animationcompornent/omoiflowers.css';
import React, { useState, useEffect, useRef } from 'react';
import FlowerCount from '../dashboad/animationcompornent/FlowerCount';
import ClickHistory from '../dashboad/animationcompornent/clickTable/ClickHistory';
import { Button } from '@chatscope/chat-ui-kit-react';
import Modal from '../dashboad/animationcompornent/clickTable/ClickTableModal';
import { ChatLines, Calendar, ClipboardCheck } from 'iconoir-react';
import { Link } from 'react-router-dom';

const NotificationPage = () => {
  const [flowerImage, setFlowerImage] = useState(1);
  const { clickHistory, userDisplayName, userId, count, recordClick, countdown } = useFirebaseClickHistory();
  const { adminFlag, isLoading, uid, displayName, tail } = useAdminFlag();
  const scrollRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [omoType, setOmoType] = useState(null);
  // メッセージ通知の状態を管理
  const [messages, setMessages] = useState([]);
  const [calendarUpdates, setCalendarUpdates] = useState([]);
  const [wishlistUpdates, setWishlistUpdates] = useState([]);


  const customFormatDate = (date) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString('ja-JP', options); // 日本の日付形式に合わせる
  };

  const formatDateDiff = (date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const diffTime = today - date;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (date.toDateString() === today.toDateString()) {
      return "今日";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "昨日";
    } else {
      return `${diffDays}日前`;
    }
  };

  useEffect(() => {
    // countに基づいてflowerImageを更新
    setFlowerImage((count % 250) || 250);
  }, [count]);

  useEffect(() => {
    const fetchNotifications = async () => {
      // メッセージに関するお知らせの取得
      const messageQuery = query(collection(db, 'messages'), where('recipientId', '==', uid));
      const messageSnapshot = await getDocs(messageQuery);

      const fetchedMessages = await Promise.all(messageSnapshot.docs.map(async (docSnapshot) => {
        const messageData = docSnapshot.data();
        const userDocRef = doc(db, 'users', messageData.senderId);
        const userDocSnap = await getDoc(userDocRef);

        let senderName = '';
        if (userDocSnap.exists()) {
          senderName = userDocSnap.data().displayName;
        } else {
          console.warn(`Sender with uid ${messageData.senderId} not found.`);
        }

        return {
          name: senderName,
          date: messageData.timestamp.toDate(),
          message: messageData.message
        };
      }));

      // メッセージを新着順にソート
      fetchedMessages.sort((a, b) => b.date - a.date);

      setMessages(fetchedMessages);
    };

    fetchNotifications();
  }, [uid]);

  useEffect(() => {
    const fetchCalendarUpdates = async () => {
      try {
        const schedulesQuery = query(collection(db, 'schedules'), orderBy('timestamp', 'desc'));
        const schedulesSnapshot = await getDocs(schedulesQuery);

        const fetchedSchedules = schedulesSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            event: customFormatDate(new Date(data.date)), // Dateオブジェクトに変換してフォーマットを適用
            updated: customFormatDate(data.timestamp?.toDate()),
            timestamp: data.timestamp?.toDate() // ソートのための日付フィールドを追加
          };
        });

        // fetchedSchedulesをtimestampに基づいてソート
        fetchedSchedules.sort((a, b) => b.timestamp - a.timestamp);

        setCalendarUpdates(fetchedSchedules);
      } catch (error) {
        console.error("Error fetching calendar updates: ", error);
      }
    };

    fetchCalendarUpdates();
  }, []);

  useEffect(() => {
    const fetchWishlistUpdates = async () => {
      try {
        const wishlistQuery = query(collection(db, 'wishes'), orderBy('timestamp', 'desc'));
        const wishlistSnapshot = await getDocs(wishlistQuery);

        const fetchedWishlist = wishlistSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            text: data.text,
            updated: formatDateDiff(data.timestamp?.toDate()),
            timestamp: data.timestamp?.toDate()
          };
        });

        // fetchedWishlistをtimestampに基づいてソート
        fetchedWishlist.sort((a, b) => b.timestamp - a.timestamp);

        setWishlistUpdates(fetchedWishlist);
      } catch (error) {
        console.error("Error fetching wishlist updates: ", error);
      }
    };

    fetchWishlistUpdates();
  }, []);

  // お花の情報表示用コンポーネント
  const renderFlowerInfo = () => {
    // 今日の日付を取得 (日本時間で)
    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth();
    const todayDate = today.getDate();

    // 今日のデータをフィルタリング
    const todaysClicks = clickHistory.filter((history) => {
      const historyDate = history.clickedAt.toDate();
      return (
        historyDate.getFullYear() === todayYear &&
        historyDate.getMonth() === todayMonth &&
        historyDate.getDate() === todayDate
      );
    });

    const todayClickCount = todaysClicks.length;
    const userClicks = clickHistory.filter(history => history.uid === userId);
    const userClickCount = userClicks.length;

    return (
      <div className="flower-info">
        {/* お花の画像 */}
        <div className="flower-image">
          <img src={`images/${flowerImage}.png`} alt="Flower" />
        </div>
        {/* 累積のomoi/花束の数など */}
        <div className="flower-data">
            <p className='omoi-all'>累積<strong>{count}</strong>omoi</p>
            <p className='omoi-today'>/ 今日<strong>{todayClickCount}</strong>omoi</p>
        </div>
      </div>
    );
  };

  const renderMessages = () => {
    return (
        <div className="message-box">
          <Link to="/talks">
            <div className="message-box-title">
              <ChatLines />
            </div>
            <div className="message-box-text">
              <h3>新着トーク</h3>
              <button className="detail-button">確認する→</button>
            </div>
            <div className="message-list">
              {messages.map((msg, index) => (
                <div className="message-item" key={index}>
                  <p>{msg.name}さん<br /><span className='timestamp-update'>更新：{formatDateDiff(msg.date)}</span></p>
                  {index === 0 && <p className="last-update">最終更新</p>}
                </div>
              ))}
            </div>
          </Link>
        </div>
    );
  };

  const renderCalenders = () => {

    return (
      <div className="calender-box">
        <Link to="/calendar">
          <div className="calender-box-title">
            <Calendar />
          </div>
          <div className="calender-box-text">
            <h3>カレンダー</h3>
            <button className="detail-button">確認する→</button>
          </div>
          <div className="calender-list">
            {calendarUpdates.map((update, index) => (
              <div className="calender-item" key={index}>
                <p>{update.event}の<br />カレンダー追加<br /><span className='timestamp-update'>更新：{formatDateDiff(update.timestamp)}</span></p>
                {index === 0 && <p className="last-update">最終更新</p>}
              </div>
            ))}
          </div>
        </Link>
      </div>
    );
  };

  const renderWishlist = () => {
    return (
      <div className="wishlist-box">
          <div>
            <div className="wishlist-box-title">
              <ClipboardCheck />
            </div>
            <div className="wishlist-box-text">
              <h3>ウィッシュ<br />リスト</h3>
              <button className="detail-button">確認する→</button>
            </div>
          </div>
          <div className="wishlist-list">
            {wishlistUpdates.map((update, index) => (
              <div className="wishlist-item" key={index}>
                <p>{update.text} <span className='timestamp-update'>{update.updated}</span></p>
                {index === 0 && <p className="last-update">最終更新</p>}
              </div>
            ))}
          </div>
      </div>
    );
  };

  return (
    <div className="notification-container">
      <h2 className="notification-title">お知らせ</h2>

      <div className="notification-box flower-info-box omoiFlowers">
          {renderFlowerInfo()}
      </div>

      <div className="notification-row">
        <div className="notification-box">
            {/* ...他のコンポーネント部分 */}
            {renderMessages()}
            {/* ...他のコンポーネント部分 */}
        </div>

        <div className="notification-box">
            {/* ...他のコンポーネント部分 */}
            {renderCalenders()}
            {/* ...他のコンポーネント部分 */}
        </div>
      </div>
      <div className="notification-box">
          <Link to="/wishlist">
            {renderWishlist()}
          </Link>
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
