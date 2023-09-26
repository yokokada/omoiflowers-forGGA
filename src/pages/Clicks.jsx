import React from 'react'
import TopNavbar from '../components/common/header/TopNavbar'
import KeyParsonClickCount from '../components/dashboad/clickcountPKF/KeyParsonClickCount'
import Footer from '../components/common/footer/FooterPK'


const clicks = () => {
  return (
    <div>
        {/* < TopNavbar /> */}
        <div style={{marginTop:'100px'}}>
        <KeyParsonClickCount showButton={false} showCountdown={false}/>
        {/* <PatientClickCount showButton={false} showCountdown={false}/> */}
        {/* <FriendsClickCount showButton={false} showCountdown={false}/> */}
        </div>
        {/* <Footer/> */}
    </div>
  )
}

export default clicks
