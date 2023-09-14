import React from 'react'
import TopNavbar from '../components/common/TopNavbar'
import FooterPK from '../components/common/FooterPK'
import Clipboard from '../components/addmember/Clipboad'
import  Qrcode  from '../components/addmember/Qrcord'

const AddMember = () => {
  return (
    <div>
      <TopNavbar/>
      <Qrcode/>
      <Clipboard/>
      <FooterPK/>
    </div>
  )
}

export default AddMember
