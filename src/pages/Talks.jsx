import React from 'react'
import MemberList from '../components/talk/Memberlist'
import TopNavbar from '../components/common/TopNavbar'
import FooterPK from '../components/common/FooterPK'
import { Send,ArrowDown } from 'iconoir-react';
import { useNavigate } from 'react-router-dom';


const Talks = () => {
  const navigate = useNavigate();

  return (
    <div>
      <TopNavbar/>
      <div className='menu' style={{ marginTop: "100px", marginBottom: "30px", marginLeft: "40px"}}>
        <div style={{ display:"flex" }}>
        <h1  style={{fontSize:'20px' ,color:'#1B3672'}} onClick={() => navigate("/all-post")}>全員に発信　</h1><Send fontSize={20} strokeWidth={1} color='#1B3672'/>
        </div>
        <div style={{ display:"flex",marginTop:'20px' }}>
          <h1 style={{fontSize:'20px',color:'#1B3672' }}>個別に選んで発信　</h1><ArrowDown  fontSize={18} strokeWidth={1} color='#1B3672'/>
        </div>
       </div>
       <MemberList/>
       <FooterPK/>
      
    </div>
  )
}

export default Talks

    

