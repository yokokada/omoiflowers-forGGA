import React from 'react'
import TopNavbar from '../components/common/header/TopNavbar'
import FooterPK from '../components/common/footer/FooterPK'
import Clipboard from '../components/addmember/Clipboad'
import  Qrcode  from '../components/addmember/Qrcord'

const AddMember = () => {
  return (
    <div>
      {/* <TopNavbar/> */}
      <Qrcode/>
      <Clipboard/>
      {/* <FooterPK/> */}
    </div>
  )
}

export default AddMember
