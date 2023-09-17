import React, { useState } from 'react';
import ClickHistory from './ClickHistory';
import UseFirebaseClickHistory from './UseFirebaseClickHistory';

const PatientClickCount = () => {
  const { clickHistory, userDisplayName, count, recordClick } = UseFirebaseClickHistory();
  const [isOpen, setIsOpen] = useState(false);

  return (
    
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <tbody>
        <tr style={{ borderBottom: '1px solid #ddd' }}>
          <td>今日のomoってるよ</td>
          <td>数</td>
        </tr>
        <tr style={{ borderBottom: '1px solid #ddd' }}>
          <td>omoってるよ累積</td>
          <td>数</td>
        </tr>
        <tr onClick={() => setIsOpen(!isOpen)} style={{ cursor: 'pointer', borderBottom: '1px solid #ddd' }}>
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
  );
}

export default PatientClickCount;