import React from 'react'
import './flowerCount.css'
import { Flower } from 'iconoir-react'
import UseFirebaseClickHistory from '../../../hooks/UseFirebaseClickHistory';

const FlowerCount = ( ) => {
    const { clickHistory, userDisplayName, userId, count, recordClick, countdown } = UseFirebaseClickHistory();

  // 250, 500, 750, ... といった形で配列を自動生成
  const flowerCountArray = Array.from({ length: 48 }, (_, i) => 250 * (i + 1));
  const flowerBouquetArray = flowerCountArray.map((count, index) => index + 1);

  return (
    <div className='flowerStamp'>
      {Array.from({ length: Math.ceil(flowerCountArray.length /8) }).map((_, rowIndex) => (
        <div className='flowers' key={rowIndex}>
          {flowerCountArray.slice(rowIndex *8, (rowIndex + 1) *8).map((flowerCount, index) => (
            <div key={index}>
              <div>
                <Flower style={{ fontSize: '20px' ,opacity: count >= flowerCount ? 1 : 0.1}} />
              </div>
              <div>
              <p style={{ opacity: count >= flowerCount ? 1 : 0.1 }}>{flowerBouquetArray[index + rowIndex *8]}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FlowerCount;

