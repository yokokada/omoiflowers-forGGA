import React from 'react'
import MemberList from '../components/talk/mamberlist/MemberList'
import TopNavbar from '../components/common/TopNavbar'
import FooterPK from '../components/common/FooterPK'
import { Send,ArrowDown } from 'iconoir-react';
import { useNavigate } from 'react-router-dom';


const Talks = () => {
  const navigate = useNavigate();

  return (
    <div>
      <TopNavbar/>
      <div className='menu' style={{ marginTop: "80px", marginBottom: "30px", marginLeft: "40px"}}>
        <div style={{ display:"flex" }}>
        <h1  style={{fontSize:'16px' ,color:'#1B3672',fontWeight:'bold'}} onClick={() => navigate("/all-post")}>全員に一括で発信　</h1><Send fontSize={16} strokeWidth={1.5} color='#1B3672'/>
        </div>
        <div style={{ display:"flex",marginTop:'20px' }}>
          <h1 style={{fontSize:'16px',color:'#1B3672' ,fontWeight:'bold'}}>個別に選んで発信　</h1><ArrowDown  fontSize={14} strokeWidth={2} color='#1B3672'/>
        </div>
       </div>
       <MemberList/>
       <FooterPK/>
      
    </div>
  )
}

export default Talks

    

