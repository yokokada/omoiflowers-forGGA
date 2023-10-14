import React, { useState,useEffect, useRef } from 'react'; // useRefをインポート
import './omoiflowers.css';
import UseFirebaseClickHistory from '../../../hooks/UseFirebaseClickHistory';
import { useAdminFlag }  from '../../../context/AdminFlagContext'
import FlowerCount from './FlowerCount';
import ClickHistory from './clickTable/ClickHistory';
import { Button } from '@chatscope/chat-ui-kit-react';
import Modal from './clickTable/ClickTableModal'

const omoiflowersData = () => {
  const { clickHistory, userDisplayName, userId, count, recordClick, countdown } = UseFirebaseClickHistory();
  const { adminFlag, isLoading,uid,displayName,tail } = useAdminFlag(); // <-- useAdminFlagで取得
  const scrollRef = useRef(null);  // スクロールする要素への参照
  const [showModal, setShowModal] = useState(false);
  const [omoType, setOmoType] = useState(null);  // 新しいステート

  useEffect(() => {
    if (scrollRef.current) {
      // スクロール位置を最下部に設定
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [count]);  // countが更新された時にスクロール位置を調整

  const isOverflow = count > 80;  // 高さが100を超えるかどうかを判断


  const userClicks = clickHistory.filter(history => history.uid === userId);
  const userClickCount = userClicks.length;

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

// console.log("Today's Clicks: ", todaysClicks);
const todayClickCount = todaysClicks.length;

  return (
    <div className='omoiFlowersData'  ref={scrollRef}>
      < div className='dataBoxWrap'>
      <h1>クリックデータ</h1>

        

        <div className='dataBox2Wrap'>
          <div className='dataBox2'>
              <p>累積omoってるよ</p>
              <p><strong style={{ fontSize: '20px' ,marginLeft:'3px', marginRight:'3px'}}>{count}</strong>回</p>
              <Button 
              style={{ backgroundColor:'#1B3672' ,color:'whitesmoke'}} 
              onClick={(e) => {
                e.stopPropagation();  // 親のdivのonClickを阻止
                console.log("Button clicked!");  // ボタンがクリックされたらコンソールに出力
                setShowModal(true);
                setOmoType('total');  // omoTypeを設定
              }}
              >
                詳細→
              </Button>
          </div>
        
        {adminFlag === 0 &&       
          <div className='dataBox2'>
              <p>今日のomoってるよ</p>
              <p><strong style={{ fontSize: '20px' ,marginLeft:'3px', marginRight:'3px'}}>{todayClickCount}</strong>回</p>
              <Button 
              style={{ backgroundColor:'#1B3672' ,color:'whitesmoke'}} 
              onClick={(e) => {
                e.stopPropagation();  // 親のdivのonClickを阻止
                console.log("Button clicked!");  // ボタンがクリックされたらコンソールに出力
                setShowModal(true)
                setOmoType('today');  // omoTypeを設定
              }}
              >
                詳細→
              </Button>
          </div>}
          
          {(adminFlag === 3 || adminFlag === 1) &&
          <div className='dataBox2'>
              <p>自分のomoってるよ</p>
              <p><strong style={{ fontSize: '20px' ,marginLeft:'3px', marginRight:'3px'}}>{userClickCount}</strong>回</p>
              <Button 
              style={{ backgroundColor:'#1B3672' ,color:'whitesmoke'}} 
              onClick={(e) => {
                e.stopPropagation();  // 親のdivのonClickを阻止
                console.log("Button clicked!");  // ボタンがクリックされたらコンソールに出力
                setShowModal(true)
                setOmoType('mine');  // omoTypeを設定
              }}
              >
                詳細→
              </Button>
          </div>}

        </div>
        <div className='dataBox' >
              <p>できた花束（250クリックで1束）</p>
              <div className='data' style={{ overflowY: isOverflow ? 'auto' : 'hidden' }}>
                <FlowerCount/>
              </div>
          </div>
          
          <Modal show={showModal} onClose={() => setShowModal(false)}>
              {omoType === 'total' && (
                <>
                  <div className='modalTitle'>
                  <p>累積omoってるよ</p>
                  </div>
                  <div className='tableContainer'>
                    <ClickHistory history={clickHistory} />
                  </div>
                </>
              )}
              {omoType === 'today' && (
                <>
                  <div className='modalTitle'>
                  <p>今日のomoってるよ</p>
                  </div>
                  <div className='tableContainer'>
                    <ClickHistory history={todaysClicks} />
                  </div>
                </>
              )}
              {omoType === 'mine' && (
                <>
                  <div className='modalTitle'>
                  <p>自分のomoってるよ履歴</p>
                  </div>
                  <div className='tableContainer'>
                    <ClickHistory history={userClicks} />
                  </div>
                </>
              )}
          </Modal>

      </div>
    </div>
  )
}

export default omoiflowersData
