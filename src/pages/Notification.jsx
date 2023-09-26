import React from 'react'
import TopNavbar from '../components/common/header/TopNavbar'
import FooterPK from '../components/common/footer/FooterPK'
import NotificationPage from '../components/notification/NotificationPage'

const Notification = () => {
  return (
    <div>
      {/* <TopNavbar/> */}
      <div style={{ marginTop:'60px' }}>
      <NotificationPage/>
      </div>
      {/* <FooterPK/> */}
    </div>
  )
}

export default Notification
