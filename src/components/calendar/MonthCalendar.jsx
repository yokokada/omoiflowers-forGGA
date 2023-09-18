import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './MonthCalender.css';
import { Flower, Hospital,  Edit, Emoji} from 'iconoir-react';


const MonthCalendar = () => {
  const [value, onChange] = useState(new Date());
  const renderTile = ({ date, view }) => {
    if (view === "month") { // 月表示のときのみアイコンを表示
      return (
        <div style={{ display: 'flex', flexDirection: 'column' ,marginTop:'5px'}}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Flower fontSize={14} strokeWidth={1} />
          <Hospital fontSize={14} strokeWidth={1} />
          </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Edit fontSize={14} strokeWidth={1} />
          <Emoji fontSize={14} strokeWidth={1} />
        </div> 
        </div>
      );
    }
  };

  return (
    <div className='Calendar'>
      <Calendar 
      onChange={onChange} 
      value={value} 
      tileContent={renderTile} // アイコンを表示する関数をtileContentにセット
      locale="en-US"/>
    </div>
  );
}

export default MonthCalendar;

