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
import Chat from './pages/Chat';
import Settings from './pages/Settings';
import Information from './pages/Information';
import Member from './pages/Member';

export const ColorContext = createContext();

function App() {
  const [bgColor, setBgColor] = useState("rgb(253, 233, 233)");

  useEffect(() => {
    document.body.style.backgroundColor = bgColor;
  }, [bgColor]);
  
  return (
<ColorContext.Provider value={{ bgColor, setBgColor }}>
  <div className={bgColor}>
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
          <Route path="/Information" element={<Information />} />
          <Route path="/Member" element={<Member />} />
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
