import React from 'react'
import MemberList from '../components/talk/Memberlist'
import TopNavbar from '../components/common/TopNavbar'
import FooterPK from '../components/common/FooterPK'


const Talks = () => {
  return (
    <div>
      <TopNavbar/>
      <div className='menu'>
          <h1>全員に発信</h1>
          <h1>個別に選んで発信</h1>
       </div>
       <MemberList/>
       <FooterPK/>
      
    </div>
  )
}

export default Talks

    

