import React from 'react';
import AnimationComponent from '../components/dashboad/animationcompornent/AnimationComponent';
import '../App.css';
import { useAdminFlag } from '../context/AdminFlagContext';
import PhysicalScale from '../components/dashboad/physicalcondition/PhysicalScales';
import Patientcondition from '../components/dashboad/patientcondition/Patientcondition';
import OmotteruyoButton from '../components/dashboad/omotteruyobutton/OmotteruyoButton'
import UseFirebaseClickHistory from '../hooks/UseFirebaseClickHistory'; // この行を追加



function Dashboard() {
  const { adminFlag, uid,displayName,tail } = useAdminFlag(); 
  const { clickHistory, userDisplayName, userId, count, recordClick, countdown } = UseFirebaseClickHistory(); // この行を追加

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
       <div style={{ marginTop:'80px' }}>
       {(adminFlag === 3 || adminFlag === 1) && <Patientcondition />}
      </div>
      <div style={{ marginTop:'10px' }}>
      <AnimationComponent />
      </div>
      <div style={{ marginTop:'60px' }}>
        {/* {adminFlag === 0 && <PatientClickCount />}
        {adminFlag === 1 && <KeyParsonClickCount />}
        {adminFlag === 3 && <KeyParsonClickCount />} */}
        {(adminFlag === 3 || adminFlag === 1) && <OmotteruyoButton count={count} recordClick={recordClick} />}
        
      </div>
      <div style={{ marginTop:'20px' }}>
      {adminFlag === 0 &&<PhysicalScale />}
      </div>
    </div>
  );
}

export default Dashboard;
