import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './MonthCalender.css';

const MonthCalendar = () => {
  const [value, onChange] = useState(new Date());

  return (
    <div className='Calendar'>
      <Calendar 
      onChange={onChange} 
      value={value} 
      locale="en-US"/>
    </div>
  );
}

export default MonthCalendar;

