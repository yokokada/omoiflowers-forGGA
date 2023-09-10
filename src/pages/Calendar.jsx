import React from 'react'
import MonthCalendar from '../components/calendar/MonthCalendar'
import TopNavbar from '../components/common/TopNavbar'
import FooterPK from '../components/common/FooterPK'

function Calendar() {
  return (
    <div>
      <TopNavbar/>
      <MonthCalendar/>
      <FooterPK/>
    </div>
  )
}

export default Calendar
