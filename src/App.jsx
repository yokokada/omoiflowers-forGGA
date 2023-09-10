import React from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate} from 'react-router-dom';
import './App.css'
import ErrorBoundary from './components/common/ErrorBoundary';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NotFoundComponent from './components/common/NotFoundComponent';
import AddMember from './pages/AddMember';
import Calendar from './pages/Calendar';
import Chat from './pages/Chat';
import Settings from './pages/Settings';
import Notification from './pages/Notification';
import Member from './pages/Member';


function App() {
  return (
    <Router>
      <ErrorBoundary>
          <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/AddMember" element={<AddMember />} />
          <Route path="/Calendar" element={<Calendar />} />
          <Route path="/Chat" element={<Chat />} />
          <Route path="/Settings" element={<Settings />} />
          <Route path="/Notification" element={<Notification />} />
          <Route path="/Member" element={<Member />} />
          <Route path="/" element={<Navigate to="/login" replace/>} /> {/* <-- Redirect to /login */}
          <Route path="*" element={<NotFoundComponent />} /> {/* Optional: Handle 404 not found */}
        </Routes>
      </ErrorBoundary>
    </Router>  
  );
}

export default App;
