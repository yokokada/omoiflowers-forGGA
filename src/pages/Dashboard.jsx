import React from 'react';
import AnimationComponent from '../components/dashboad/animationcompornent/AnimationComponent';
import '../App.css';
import PatientClickCount from '../components/dashboad/clickcountPKF/PatientClickCount';
import KeyParsonClickCount from '../components/dashboad/clickcountPKF/KeyParsonClickCount';
import FriendsClickCount from '../components/dashboad/clickcountPKF/FriendsClickCount';
import { useAdminFlag } from '../context/AdminFlagContext';
import PhysicalScale from '../components/dashboad/physicalcondition/PhysicalScales'
import Patientcondition from '../components/dashboad/patientcondition/Patientcondition'


function Dashboard() {
  const { adminFlag, uid,displayName,tail } = useAdminFlag(); 

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
       <div style={{ marginTop:'70px' }}>
        <Patientcondition/>
      </div>
      <div style={{ marginTop:'20px' }}>
      <AnimationComponent />
      </div>
      <div style={{ marginTop:'60px' }}>
        {adminFlag === 0 && <PatientClickCount />}
        {adminFlag === 1 && <KeyParsonClickCount />}
        {adminFlag === 3 && <KeyParsonClickCount />}
      </div>
      <div style={{ marginTop:'30px' }}>
      {adminFlag === 0 &&<PhysicalScale />}
      </div>
    </div>
  );
}

export default Dashboard;
