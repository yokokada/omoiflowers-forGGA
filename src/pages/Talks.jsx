import React from 'react'
import MemberList from '../components/talk/mamberlist/MemberList'
import TopNavbar from '../components/common/TopNavbar'
import FooterPK from '../components/common/FooterPK'
import MenuComponent from '../components/talk/MenuComponent';

const Talks = () => {

  return (
    <div>
      <TopNavbar/>
      <MenuComponent/>
       <MemberList/>
       <FooterPK/>
    </div>
  )
}

export default Talks

    

