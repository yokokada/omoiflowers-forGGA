import React, { useState, useEffect } from 'react';
import ClickHistory from './ClickHistory';
import UseFirebaseClickHistory from './UseFirebaseClickHistory';
import FooterPK from '../../common/footer/FooterPK';
import './ClickTable.css';

const KeyParsonClickCount = () => {
  // 画面遷移時にスクロール制御をかける定義
  const [isScrollDisabled, setIsScrollDisabled] = useState(true);
  // omoってるよボタンの稼働状況テーブルの表示の定義
  const { clickHistory, userDisplayName, userId, count, recordClick} = UseFirebaseClickHistory();

  // トグルボタンの定義
  const [isOpenMyThoughts, setIsOpenMyThoughts] = useState(false);
  const [isOpenClickers, setIsOpenClickers] = useState(false);
  // スクロール位置を管理するstateを定義
  const [savedScrollY, setSavedScrollY] = useState(0); // このstateをコンポーネントの上部で定義

  // 画面遷移時のスクロールの制御処理
  useEffect(() => {
    setSavedScrollY(window.scrollY); // 遷移時のスクロール位置を記録

    if (isScrollDisabled) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, []); // 依存配列が空なので、このエフェクトはコンポーネントのマウント時にのみ実行されます

  // トグルの状態に基づくスクロール制御
  useEffect(() => {
    if (isOpenMyThoughts || isOpenClickers) {
      document.body.style.overflow = ''; // トグルがオープン時にスクロールを解除
    } else {
      document.body.style.overflow = 'hidden'; // トグルがクローズ時にスクロールを制限
      window.scrollTo(0, savedScrollY); // 遷移時の位置に戻る
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpenMyThoughts, isOpenClickers]);

  // 保存されたスクロール位置に戻す関数
  const restoreScrollPosition = () => {
    window.scrollTo(0, savedScrollY);
  }

  // トグルの状態を変更する関数
  const toggleFunction = (setToggle, isOpen) => {
    setToggle(!isOpen); // トグルの状態を反転
    if (isOpen) { // トグルがオープンされている場合、クローズする
      setTimeout(restoreScrollPosition, 0); // 微小な遅延を持たせてスクロール位置を復元
    }
  }

  // トグルボタンを押した時の処理
  const handleToggleClick = (setToggleFunction, isOpen) => {
    setSavedScrollY(window.scrollY);
    setToggleFunction(!isOpen);
  };
  // トグルの状態でスクロール位置を復元
  useEffect(() => {
    if (!isOpenMyThoughts && !isOpenClickers) {
      window.scrollTo(0, savedScrollY);
    }
  }, [isOpenMyThoughts, isOpenClickers, savedScrollY]);

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

console.log("Today's Clicks: ", todaysClicks);
const todayClickCount = todaysClicks.length;

  // ここから下が実際の表示内容
  return (
    <div>
      <div className='tablespace'>
      <div className='mainTable'>
        <div className='row' onClick={() => handleToggleClick(setIsOpenClickers, isOpenClickers)} style={{ cursor: 'pointer', borderBottom: '1px solid #ddd' }}>
          <p className='a'>omoってるよ累積</p>
          <p className='b'>{count}</p>
          <p className='c'>{isOpenClickers ? '▲' : '▼'}</p>
        </div>
        {isOpenClickers && (
          <ClickHistory history={clickHistory} />
        )}
        <div className='row' onClick={() => handleToggleClick(setIsOpenMyThoughts, isOpenMyThoughts)} style={{ cursor: 'pointer', borderBottom: '1px solid #ddd' }}>
          <p className='a'>今日のomoってるよ</p>
          <p className='b'>{todayClickCount} </p>
          <p className='c'>{isOpenMyThoughts ? '▲' : '▼'}</p>
        </div>
        {isOpenMyThoughts && (
          <ClickHistory history= {todaysClicks} />
        )}
      </div>
      {/* <FooterPK /> */}
    </div>
    </div>
    
  );
}

export default KeyParsonClickCount;
