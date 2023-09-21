import React from 'react';
import TopNavbar from '../components/common/TopNavbar';
import FooterPK from '../components/common/FooterPK';
import MemberList from '../components/talk/mamberlist/MemberList';
const Member = () => {
  return (
    <div>
      <TopNavbar/>
      <div style={{ marginTop:'80px' }}>
      <MemberList isClickable={false}/> {/* isClickableをfalseとしてセット */}
      </div>
      <FooterPK/>
    </div>
  )
}

export default Member
