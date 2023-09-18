import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './MonthCalender.css';
import { Hospital,  Edit, Emoji} from 'iconoir-react';


const MonthCalendar = () => {
  const [value, onChange] = useState(new Date());
  const [iconDates, setIconDates] = useState({}); // アイコンの情報を保持するステート
  const [events, setEvents] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIcon, setCurrentIcon] = useState(null);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setCurrentIcon(events[date] || null);
    setIsModalOpen(true);
  };

  const saveEvent = () => {
    setEvents(prevEvents => ({
      ...prevEvents,
      [selectedDate]: currentIcon
    }));
    setIsModalOpen(false);
  };


  const renderTile = ({ date, view }) => {
    if (view === "month") { // 月表示のときのみアイコンを表示
      const dateStr = date.toISOString().split('T')[0];
      const iconName = iconDates[dateStr];

      return (
        <div style={{ display: 'flex', flexDirection: 'column' ,marginTop:'5px'}}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Emoji fontSize={14} strokeWidth={1} />
          
          </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Hospital fontSize={14} strokeWidth={1} />
          <Edit fontSize={14} strokeWidth={1} />
          
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

