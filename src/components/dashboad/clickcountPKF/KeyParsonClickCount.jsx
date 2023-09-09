import React, { useState , useEffect } from 'react';
import ClickHistory from '../ClickHistory';
import UseFirebaseClickHistory from '../UseFirebaseClickHistory';
import OmotteruyoButton from '../../common/OmotteruyoButton';
import Countdown from '../Countdown';
import FooterPK from '../../common/FooterPK';

const KeyParsonClickCount = () => {
   // 画面遷移時にスクロール制御をかける定義
  const [isScrollDisabled, setIsScrollDisabled] = useState(true); 
  // omoってるよボタンの稼働状況テーブルの表示の定義
  const { clickHistory, userDisplayName, count, recordClick, countdown } = UseFirebaseClickHistory();
  // トグルボタンの定義
  const [isOpenMyThoughts, setIsOpenMyThoughts] = useState(false);
  const [isOpenClickers, setIsOpenClickers] = useState(false);
  // スクロール位置を管理するstateを定義
  const [savedScrollY, setSavedScrollY] = useState(0);  // このstateをコンポーネントの上部で定義

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


  // omoってるよボタンを押した時の処理
  const handleButtonClick = () => {
    const newCount = count + 1;
    const currentDate = new Date();
    recordClick(newCount, currentDate);
    // ここからスクロールの制御を削除します。
  };

//カウントダウンが完了した時の処理
  const handleCountdownComplete = () => {};

// 保存されたスクロール位置に戻す関数
const restoreScrollPosition = () => {
  window.scrollTo(0, savedScrollY);
}

// トグルの状態を変更する関数
const toggleFunction = (setToggle, isOpen) => {
  setToggle(!isOpen);  // トグルの状態を反転
  if (isOpen) {  // トグルがオープンされている場合、クローズする
    setTimeout(restoreScrollPosition, 0);  // 微小な遅延を持たせてスクロール位置を復元
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

  
  // スタイルの定義
  const styles = {
    mainTable: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100vh',
    }
  };

// ここから下が実際の表示内容
  return (
    <div>
      {/* カウントダウンの表示 → うまく表示できていない */}
      <Countdown initialCountdown={countdown} onCountdownComplete={handleCountdownComplete}/>
      {/* omoってるよボタンの表示 */}
      <OmotteruyoButton onClick={handleButtonClick} />
      {/* omoってるよボタンの稼働状況テーブルの表示 ⇨ 下のテーブルの左によってるのなんとかしたい*/}
      <div style={styles.mainTable}>
        <table style={{borderCollapse: 'collapse' }}>
          <tbody>
            <tr style={{ borderBottom: '1px solid #ddd' }}>
              <td>omoってるよ累積</td>
              <td>{count}</td>
            </tr>
            <tr  onClick={() => handleToggleClick(setIsOpenMyThoughts, isOpenMyThoughts)} style={{ cursor: 'pointer', borderBottom: '1px solid #ddd' }}>
              <td>自分のomoってるよ</td>
              <td>自分のomoってるよ</td>
              {/* 一個目のトグル：自分の数カウント */}
              <td>{isOpenMyThoughts ? '▲' : '▼'}</td>
            </tr>
            {isOpenMyThoughts && (
              <tr>
                <td colSpan={2}>
                  <p>ここに自分の思っているよが入るよ</p>
                </td>
              </tr>
            )}
            <tr  onClick={() => handleToggleClick(setIsOpenClickers, isOpenClickers)} style={{ cursor: 'pointer', borderBottom: '1px solid #ddd' }}>
              <td>押してくれた人</td>
              <td>押してくれた人</td>
              {/* 2個目のトグル：トータル数通した人カウント */}
              <td>{isOpenClickers ? '▲' : '▼'}</td>
            </tr>
            {isOpenClickers && (
              <tr>
                <td colSpan={2}>
                    {/* トータル数通した人カウント状況のテーブル表示 */}
                  <ClickHistory history={clickHistory} />
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* 患者Pと家族用Kのフッター */}
        <FooterPK/> 
      </div>
    </div> 
  );
}

export default KeyParsonClickCount;
