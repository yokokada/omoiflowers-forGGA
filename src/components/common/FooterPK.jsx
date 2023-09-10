import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Calendar, Settings, ChatLines, AddUser } from 'iconoir-react';

const styles = {
  footerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 20px 10px 20px',
    alignItems: 'center',
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(253, 233, 233, 0.8)',
},
  iconLink: {
    fontSize: '24px',
    color: '#1B3672',
    textDecoration: 'none',
    display: 'grid',
    alignItems: 'end',
  },
  hover: {
    opacity: 0.8,
  }
}

const Footer = () => {
  return (
    <div style={styles.footerContainer}>
      <Link to="/dashboard" style={styles.iconLink}>
        <Home />
      </Link>
      <Link to="/chat" style={styles.iconLink}>
        <ChatLines />
      </Link>
      <Link to="/addMember" style={styles.iconLink}>
        <AddUser />
      </Link>
      <Link to="/calendar" style={styles.iconLink}>
        <Calendar />
      </Link>

      <Link to="/settings" style={styles.iconLink}>
        <Settings />
      </Link>
      
    </div>
  );
}

export default Footer;

