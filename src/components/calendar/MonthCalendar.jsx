import React, { useState , useEffect } from 'react';
import Calendar from 'react-calendar';
import './MonthCalender.css';
import { Hospital,  Edit, Emoji} from 'iconoir-react';
import EventModal from './EventModal';
import { db } from '../../pages/Firebase';
import { collection, getDocs, query, where } from 'firebase/firestore'; // 必要なFirestore関数をインポート
import IconDescription from './IconDescription'; // IconDescriptionのインポート
import FriendsEventModal from './FriendsEventModal';
import { useAdminFlag } from '../../context/AdminFlagContext';


const MonthCalendar = () => {
  const { adminFlag,} = useAdminFlag(); // <-- useAdminFlagで取得
  const [value, onChange] = useState(new Date());
  const [events, setEvents] = useState({});
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isFriendsModalOpen, setIsFriendsModalOpen] = useState(false); // FriendsEventModal専用の状態
  const [selectedIcons, setSelectedIcons] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("18:00");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'schedules')); // 全てのドキュメントを取得
        const fetchedEvents = {};
        querySnapshot.forEach(doc => {
          const data = doc.data();
          fetchedEvents[data.date] = {
            emoji: {
              selected: data.omimai === 'on',
              startTime: data['o-time'] ? data['o-time'].split('-')[0] : '',
              endTime: data['o-time'] ? data['o-time'].split('-')[1] : ''
            },
            hospital: {
              selected: data.care === 'on',
              startTime: data['c-time'] ? data['c-time'].split('-')[0] : '',
              endTime: data['c-time'] ? data['c-time'].split('-')[1] : ''
            },
            edit: {
              selected: data.record === 'on'
            }
            // 他のフィールドも同様にマッピング
          };
        });
        setEvents(fetchedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleDateClick = (date) => {
    console.log("handleDateClickが呼ばれました", date);
    const dateStr = date.toLocaleDateString('en-CA');
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
  
    // adminFlagに応じて対応するモーダルの状態を変更
    if (adminFlag === 0 || adminFlag === 1) {
      setIsEventModalOpen(true);
      setIsFriendsModalOpen(false);  // 追加：友達のモーダルを閉じる
    } else if (adminFlag === 3) {
      setIsFriendsModalOpen(true);
      setIsEventModalOpen(false);  // 追加：イベントモーダルを閉じる
    }
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
      setIsEventModalOpen(false);
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
      { 
      // adminFlagが0または1の場合はEventModalを表示
      (adminFlag === 0 || adminFlag === 1) && 
      <EventModal 
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        date={selectedDate}
        iconsWithTime={iconsWithTime}
        onIconToggle={toggleIconTimeSelection}
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
        onSave={saveEvent}
        setIconsWithTime={setIconsWithTime}
      />
    }
    {
      // adminFlagが3の場合はFriendsEventModalを表示
      adminFlag === 3 &&
      <div>
        <FriendsEventModal 
        isOpen={isFriendsModalOpen} 
        onClose={() => setIsFriendsModalOpen(false)}
        selectedDate={selectedDate}  // selectedDateを渡す
         />
    </div>
    }
       <IconDescription />  
  </div>
    
  );
}

export default MonthCalendar;

