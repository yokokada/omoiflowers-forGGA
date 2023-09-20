import React, { createContext, useState ,useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate} from 'react-router-dom';
import './App.css'
import ErrorBoundary from './components/common/ErrorBoundary';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NotFoundComponent from './components/common/NotFoundComponent';
import AddMember from './pages/AddMember';
import Calendar from './pages/Calendar';
import Talks from './pages/Talks';
import Settings from './pages/Settings';
import Notification from './pages/Notification';
import Member from './pages/Member';
import Chat from './pages/Chat';
import AllPost from './pages/AllPost';
import Clicks from './pages/Clicks';


export const ColorContext = createContext();

function App() {
  const initialColor = localStorage.getItem('bgColor') || "rgb(253, 233, 233)";
  const [bgColor, setBgColor] = useState(initialColor);


  useEffect(() => {
    document.body.style.backgroundColor = bgColor;

    // 色が変わったたびにローカルストレージにも保存
    localStorage.setItem('bgColor', bgColor);
    }, [bgColor]);
  
  return (
<ColorContext.Provider value={{ bgColor, setBgColor }}>
  <div style={{ backgroundColor: bgColor }}>
    <Router>
      <ErrorBoundary>
          <Routes>
          <Route path="/all-post" element={<AllPost />} />
          <Route path="/clicks" element={<Clicks />} />
          <Route path="/chat/:memberId" element={<Chat />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addMember" element={<AddMember />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/talks" element={<Talks />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/member" element={<Member />} />
          <Route path="/" element={<Navigate to="/login" replace/>} /> {/* <-- Redirect to /login */}
          <Route path="*" element={<NotFoundComponent />} /> {/* Optional: Handle 404 not found */}
        </Routes>
      </ErrorBoundary>
    </Router>  
    </div>  
  </ColorContext.Provider>
  );
}

export default App;
