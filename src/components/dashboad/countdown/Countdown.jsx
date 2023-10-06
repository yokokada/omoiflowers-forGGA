import React, { useState, useEffect } from 'react';
import './Countdown.css'

const Countdown = ({ initialCountdown, onCountdownComplete }) => {
  const [countdown, setCountdown] = useState(initialCountdown);

  // initialCountdownの変更を検知して、カウントダウンをリセットする
  useEffect(() => {
    setCountdown(initialCountdown);
  }, [initialCountdown]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
      return () => {
        clearTimeout(timer);  // クリーンアップ関数でタイマーをクリアする
      };
    } else {
      onCountdownComplete();
    }
  }, [countdown, onCountdownComplete]);

  return (
    <div className='countdown'>
      {countdown > 0 && <p> {countdown}</p>}
    </div>
  );
};

export default Countdown;
