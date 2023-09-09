// CustomModal.jsx
import React from 'react';

const CustomModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.7)' }}>
      <div style={{ width: '300px', margin: '100px auto', padding: '20px', background: 'white', textAlign: 'center' }}>
        {children}
        <button onClick={onClose} style={{
          display: 'inline-block',
          marginTop: '20px',
          borderRadius: '8px', // この行でボタンの角を丸くします。
          padding: '10px 20px', // パディングでボタンのサイズを調整します。
          border: 'none', // ボタンの境界線を削除します。
          backgroundColor: '#f39459', // ボタンの背景色を設定します。
          color: 'white' ,// ボタンのテキスト色を白に設定します。
          width: '100px' ,// ボタンの幅を設定します。
          height: '50px' // ボタンの高さを設定します。
        }}>閉じる</button>
      </div>
    </div>
  );  
}

export default CustomModal;
