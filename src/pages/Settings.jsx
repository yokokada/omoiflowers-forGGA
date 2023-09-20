import React, { createContext, useState ,useEffect} from 'react'
import TopNavbar from '../components/common/TopNavbar'
import FooterPK from '../components/common/FooterPK'
import AvatarUploader from '../components/settings/AvatarUploader'
import DisplayNameSetting from '../components/settings/DisplayNameSetting'
import ChangeColor from '../components/settings/ChangeColor'
import '../components/settings/Settings.css'

const Settings = () => {
  
  return (
    <div className='settingContents'>
      <TopNavbar/>
      <div style={{ marginTop:'50px' }}>
      <AvatarUploader />
      <ChangeColor/>
      <DisplayNameSetting/>
      </div>
      <FooterPK/>
    </div>
  )
}

export default Settings
