import React from 'react'
import TopNavbar from '../components/common/TopNavbar'
import FooterPK from '../components/common/FooterPK'
import AvatarUploader from '../components/common/AvatarUploader'
import DisplayNameSetting from '../components/settings/DisplayNameSetting'

const Settings = () => {
  return (
    <div>
      <TopNavbar/>
      <AvatarUploader />
      <DisplayNameSetting/>
      <FooterPK/>
    </div>
  )
}

export default Settings
