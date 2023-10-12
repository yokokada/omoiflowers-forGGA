import React from 'react'
import MonthCalendar from '../components/calendar/MonthCalendar'
import TopNavbar from '../components/common/header/TopNavbar'
import FooterPK from '../components/common/footer/FooterPK'

function Calendar() {
  return (
    <div>
      <div style={{ marginTop:'20px' }}>
      <MonthCalendar/>
      </div>
    </div>
  )
}

export default Calendar
