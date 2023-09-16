import React from 'react'
import TopNavbar from '../components/common/TopNavbar'
import KeyParsonClickCount from '../components/dashboad/clickcountPKF/KeyParsonClickCount'
import Footer from '../components/common/FooterPK'


const clicks = () => {
  return (
    <div>
        < TopNavbar />
        <div style={{marginTop:'100px'}}>
        <KeyParsonClickCount showButton={false} showCountdown={false}/>
        </div>
        <Footer/>
    </div>
  )
}

export default clicks
