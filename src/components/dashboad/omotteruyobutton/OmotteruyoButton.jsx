import React, { useState, useEffect } from 'react'
import './OmotteruyoButton.css'

const OmotteruyoButton = ({ count, recordClick }) => {
  const [showCount, setShowCount] = useState(false);

  const handleButtonClick = () => {
    const newCount = count + 1;
    const currentDate = new Date();
    recordClick(newCount, currentDate);
    setShowCount(true);  // カウントを表示
  };

  // アニメーションが完了したらカウントを非表示にする
  useEffect(() => {
    if (showCount) {
      const timer = setTimeout(() => {
        setShowCount(false);
      }, 3000);  // 1秒後に非表示にする

      return () => clearTimeout(timer);
    }
  }, [showCount]);

  return (
    <div style={{ position: 'relative' }}>  {/* 親要素に position: relative を追加 */}
       <div className={`count-animation ${showCount ? '' : 'hide'}`}>
        {count}
      </div>
      <button className='omotteruyobotton' onClick={handleButtonClick}>
        omo<br/>ってるよ！
      </button>
  </div>
  );
};

export default OmotteruyoButton;
