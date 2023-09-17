import React from 'react'
import TopNavbar from '../components/common/TopNavbar'
import FooterPK from '../components/common/FooterPK'
import AllPostMessage from '../components/talk/allpost/AllPostMessage'

const AllPost = () => {
  return (
    <div>
      <TopNavbar/>
      <div style={{ marginTop:'80px' }}>
         <AllPostMessage />
      </div>
      <FooterPK/>
      
    </div>
  )
}

export default AllPost
