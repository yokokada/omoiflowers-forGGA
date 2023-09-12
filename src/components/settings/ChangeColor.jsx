import React, { useContext }  from 'react'
import '../.././App.css';
import { ColorContext } from '../../App';

const ChangeColor = () => {
    const { setBgColor } = useContext(ColorContext);
    
      return (
        <div>
          <button onClick={() => setBgColor('bg-blue')}>水色</button>
          <button onClick={() => setBgColor('bg-pink')}>ピンク</button>
          <button onClick={() => setBgColor('bg-yellow')}>黄色</button>
        </div>
      );
    };

export default ChangeColor
