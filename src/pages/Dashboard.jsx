import React from 'react';
import AnimationComponent from '../components/dashboad/AnimationComponent';
import TopNavbar from '../components/common/header/TopNavbar';
import '../App.css';
import PatientClickCount from '../components/dashboad/clickcountPKF/PatientClickCount';
import KeyParsonClickCount from '../components/dashboad/clickcountPKF/KeyParsonClickCount';
import FriendsClickCount from '../components/dashboad/clickcountPKF/FriendsClickCount';

function Dashboard() {

  const styles = {
    topNavBar: {
      backgroundColor: 'transparent',
      border: 'none',
      boxShadow: 'none',
      position: 'fixed',
      top: 0,
      width: '100%',  // 画面全体の幅に合わせる
      zIndex: 1000     // 他の要素より前面に表示するためのz-index
    },
    mainContent: {
      paddingTop: '30px'  // これはTOPNavBarの高さに応じて調整してください
    }
  };
  
  return (
    <div>
     {/* <TopNavbar/> */}
      <AnimationComponent />
      {/* <PatientClickCount /> */}
      <KeyParsonClickCount/>
      {/* <FriendsClickCount/> */}
      
    </div>
  );
}

export default Dashboard;
