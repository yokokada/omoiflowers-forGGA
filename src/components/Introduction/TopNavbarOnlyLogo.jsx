import React from 'react';

  const TopNavbarOnlyLogo = () => {
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
        <div className="center-item">
          <h1 className="navbar-item" style={{ fontWeight: "bold" }}>omoi flowers</h1>
        </div>
      </div>
       
    );
  }
  
  export default TopNavbarOnlyLogo
  

