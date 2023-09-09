import React, { useState, useEffect } from 'react';
import CustomModal from './CustomModal';  // 忘れずにインポートしてください
import Countdown from './Countdown';
import useFirebaseClickHistory from './UseFirebaseClickHistory';

const AnimationComponent = () => {
// ーーーーーー最初の状態をuseStateで定義ーーーーーーーーーーーーーーーーーーーー
    const [image, setImage] = useState('0.png');
    const [lastClicked, setLastClicked] = useState(null);
    const [countdown, setCountdown] = useState(0);  // カウントダウンの状態
    const [showModal, setShowModal] = useState(false);  // モーダルの状態
    const {count, recordClick } = useFirebaseClickHistory(setCountdown, setLastClicked);

// ーーーーーーuseEffect関連コードーーーーーーーーーーーーーーーーーーーーーーー
useEffect(() => {
    setImage(`${count}.png`);
}, [count]);

useEffect(() => {
    console.log("countdown changed:", countdown);
}, [countdown]);

// ーーーーーーークリック時の処理ーーーーーーーーーーーーーーーーーーー
const handleClick = async () => {
    const now = new Date();
    const isWithinLastClickInterval = (currentDate) => {
        if (!lastClicked) return false;  // 最後にクリックされた日時がない場合
    const diffInSeconds = Math.round((currentDate - lastClicked) / 1000);
        return diffInSeconds < 60;
    };
    if (isWithinLastClickInterval(now)) {
        setShowModal(true);
        return;
    }
    // クリックが上限に達した場合
    if (count === 250) {
        resetCount();
        return;
    }
        recordClick(count + 1, now);
        localStorage.setItem('lastClicked', now.toString());
        setLastClicked(now);
        setCountdown(60);
    };

const handleCountdownComplete = () => {
    // カウントダウンが完了した時の処理
    // 現時点では何もしない
};

// ーーーーーーーーーここから下が実際の表示内容ーーーーーーーーーーーー
    return (
        <div className='omoi-flowers'>
             
            <div className='base_flowers'>
            <img src={`images/${image}`} alt="base_flowers" width={200} />
            </div>
            <CustomModal isOpen={showModal} onClose={() => setShowModal(false)}>
                <p>1分間に1回しかクリックできません！</p>
            </CustomModal>
        </div>
    );
};


export default AnimationComponent;

