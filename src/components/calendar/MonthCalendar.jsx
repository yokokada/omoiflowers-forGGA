import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './MonthCalender.css';
import { Hospital,  Edit, Emoji} from 'iconoir-react';
import EventModal from './EventModal';


const MonthCalendar = () => {
  const [value, onChange] = useState(new Date());
  const [events, setEvents] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIcons, setSelectedIcons] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("18:00");


  const handleDateClick = (date) => {
    const dateStr =date.toLocaleDateString('en-CA');
    setSelectedDate(dateStr);
    const iconsForDate = events[dateStr];
    if (iconsForDate) {
        // 日付に対するイベントデータが存在する場合
        setIconsWithTime(iconsForDate);
    } else {
        // 日付に対するイベントデータが存在しない場合、アイコンと時間の情報を初期値にリセット
        setIconsWithTime({
            emoji: {
                selected: false,
                startTime: "09:00",
                endTime: "10:00"
            },
            hospital: {
                selected: false,
                startTime: "09:00",
                endTime: "10:00"
            },
        });
    }
    setIsModalOpen(true);
};

  const [iconsWithTime, setIconsWithTime] = useState({
    emoji: {
        selected: false,
        startTime: "09:00",
        endTime: "10:00"
    },
    hospital: {
        selected: false,
        startTime: "9:00",
        endTime: "10:00"
    },
  });

  const toggleIconTimeSelection = (iconName) => {
    setIconsWithTime(prev => {
      const updatedIcon = {
        ...prev[iconName],
        selected: !prev[iconName].selected
      };
      return { ...prev, [iconName]: updatedIcon };
    });
  };

    const saveEvent = () => {
      setEvents(prevEvents => ({
        ...prevEvents,
        [selectedDate]: iconsWithTime
      }));
      setIsModalOpen(false);
    };

  const renderTile = ({ date, view }) => {
    if (view === "month") { // 月表示のときのみアイコンを表示
      const dateStr = date.toLocaleDateString('en-CA');      
      const iconsForDate = events[dateStr] || []; // この行を追加

      return (
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '5px' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {iconsForDate.emoji?.selected ? 
                 <Emoji fontSize={14} strokeWidth={1} /> 
                 : <div style={{ width: '14px', height: '24px' }}></div>}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {iconsForDate.hospital?.selected ? 
                <Hospital fontSize={14} strokeWidth={1} /> 
                : <div style={{ width: '14px', height: '20px' }}></div>}
                 {iconsForDate.edit?.selected ? 
                <Edit fontSize={14} strokeWidth={1} /> 
                : <div style={{ width: '14px', height: '20px' }}></div>}
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
      onClickDay={handleDateClick}
      locale="en-US"
    />
    <EventModal 
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      date={selectedDate}
      iconsWithTime={iconsWithTime}
      onIconToggle={toggleIconTimeSelection}
      startTime={startTime}
      setStartTime={setStartTime}
      endTime={endTime}
      setEndTime={setEndTime}
      onSave={saveEvent}
      setIconsWithTime={setIconsWithTime} // この行を追加
    />      
  </div>
    
  );
}

export default MonthCalendar;

