import React, { useState } from 'react';
import ClickHistory from '../ClickHistory';
import UseFirebaseClickHistory from '../UseFirebaseClickHistory';
import OmotteruyoButton from '../common/OmotteruyoButton';
import Countdown from '../Countdown';


const KeyParsonClickCount = () => {
  const { clickHistory, userDisplayName, count, recordClick,countdown } = UseFirebaseClickHistory();
  const [isOpen, setIsOpen] = useState(false);
   // ボタンがクリックされたときの処理
   const handleButtonClick = () => {
    const newCount = count + 1;
    const currentDate = new Date();
    recordClick(newCount, currentDate);
  };
  const handleCountdownComplete = () => {
    // カウントダウンが完了した時の処理
    // 現時点では何もしない
};
  return (
    <div>
        <Countdown initialCountdown={countdown} 
             onCountdownComplete={handleCountdownComplete}/>
        <OmotteruyoButton onClick={handleButtonClick} />
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
                <tr style={{ borderBottom: '1px solid #ddd' }}>
                <td>omoってるよ累積</td>
                <td>{count}</td>
                </tr>
                <tr onClick={() => setIsOpen(!isOpen)} style={{ cursor: 'pointer', borderBottom: '1px solid #ddd' }}>
                <td>自分のomoってるよ</td>
                <td>自分のomoってるよ</td>
                <td>{isOpen ? '▲' : '▼'}</td>
                </tr>
                {isOpen && (
                <tr>
                    <td colSpan={2}>
                    <p>ここに自分の思っているよが入るよ</p>
                    </td>
                </tr>
                )}

                <tr onClick={() => setIsOpen(!isOpen)} style={{ cursor: 'pointer', borderBottom: '1px solid #ddd' }}>
                <td>押してくれた人</td>
                <td>押してくれた人</td>
                <td>{isOpen ? '▲' : '▼'}</td>
                </tr>
                {isOpen && (
                <tr>
                    <td colSpan={2}>
                    <ClickHistory history={clickHistory} />
                    </td>
                </tr>
                )}
            </tbody>
         </table>
    </div>
    
    
  );
}

export default KeyParsonClickCount;