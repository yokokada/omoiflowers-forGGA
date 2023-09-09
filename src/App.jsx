import React from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate} from 'react-router-dom';
import './App.css'
import ErrorBoundary from './components/ErrorBoundary';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import NotFoundComponent from './components/NotFoundComponent';

function App() {
  return (
    <Router>
      <ErrorBoundary>
          <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Navigate to="/login" replace/>} /> {/* <-- Redirect to /login */}
          <Route path="*" element={<NotFoundComponent />} /> {/* Optional: Handle 404 not found */}
        </Routes>
      </ErrorBoundary>
    </Router>  
  );
}

export default App;
