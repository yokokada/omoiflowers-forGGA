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

  return (
    <div className="navbar">
      <div className="left-item">
        <a href="#" className="navbar-item"><Flower size={50} strokeWidth={1} /></a>
      </div>
      
      <div className="center-item">
        <h1 className="navbar-item" style={{ fontWeight: "bold" }}>omoi flowers</h1>
      </div>

      <div className="right-item">
        <div className="navbar-item" onClick={() => setMenuOpen(!menuOpen)}>
          <MoreHoriz size={50} strokeWidth={2} />
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

