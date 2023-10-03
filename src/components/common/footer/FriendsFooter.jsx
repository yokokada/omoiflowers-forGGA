import React, { useContext }from 'react';
import { Link } from 'react-router-dom';
import { Home, Calendar, Settings, ChatLines, Group } from 'iconoir-react';
import { ColorContext } from '../../../App';

const convertRGBtoRGBA = (rgbString, opacity) => {
  return rgbString.replace('rgb', 'rgba').replace(')', `, ${opacity})`);
};

const Footer = () => {
  const { bgColor } = useContext(ColorContext);  // bgColorを取得

  const styles = {
    footerContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '10px 20px 20px 20px',
      alignItems: 'center',
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: convertRGBtoRGBA(bgColor, 0.8),
  },
    iconLink: {
      fontSize: '16px',
      color: '#1B3672',
      textDecoration: 'none',
      display: 'grid',
      alignItems: 'end',
    },
    hover: {
      opacity: 0.8,
    }
  }
  return (
    <div style={styles.footerContainer}>
      <Link to="/dashboard" style={styles.iconLink}>
        <Home />
      </Link>
      <Link to="/talks" style={styles.iconLink}>
        <ChatLines />
      </Link>
      <Link to="/member" style={styles.iconLink}>
        <Group />
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

