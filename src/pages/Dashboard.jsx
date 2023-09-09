import React from 'react';
import AnimationComponent from '../components/AnimationComponent';
import TopNavbar from '../components/common/TopNavbar';
import '../App.css';
import PatientClickCount from '../components/clickcount/PatientClickCount';
import KeyParsonClickCount from '../components/clickcount/KeyParsonClickCount';

function Dashboard() {
  return (
    <div>
     <TopNavbar/>
      <AnimationComponent />
      {/* <PatientClickCount /> */}
      <KeyParsonClickCount/>
      
    </div>
  );
}

export default Dashboard;
