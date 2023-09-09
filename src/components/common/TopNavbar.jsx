import React, { useState } from 'react';
import './Navbar.css';
import { MoreHoriz } from 'iconoir-react';
import { Flower } from 'iconoir-react';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  const styles = {
    navbarFixed: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 1000
    }
  };

  return (
    <div className="navbar" style={styles.navbarFixed}>
      <div className="left-item">
        <a href="/infomation" className="navbar-item"><Flower fontSize={20} strokeWidth={1} /></a>
      </div>
      
      <div className="center-item">
        <h1 className="navbar-item" style={{ fontWeight: "bold" }}>omoi flowers</h1>
      </div>

      <div className="right-item">
        <div className="navbar-item" onClick={() => setMenuOpen(!menuOpen)}>
          <MoreHoriz fontSize={20}  strokeWidth={2} />
        </div>
      </div>

      <div className={menuOpen ? 'menu-open' : ''}>
        {menuOpen && (
            <div className="dropdown-menu">
            {menuItems.map((item, index) => (
                <a key={index} href="#" className="dropdown-item">
                {item}
                </a>
            ))}
            </div>
        )}
      </div>
    </div>
  );
}

