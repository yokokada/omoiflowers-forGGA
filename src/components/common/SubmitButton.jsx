import React from 'react'

const SubmitButton = ({ children, onClick }) => {
        const buttonStyle = {
          display: 'flex',
          width: '240px',
          height: '50px',
          justifyContent: 'center',
          alignItems: 'center',
          flexShrink: 0,
          boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
          backgroundColor: '#1B3672',
          color: 'white',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer',
          transition: '0.3s',
          marginTop: '50px',
          marginBottom: '20px',
        };
      
        const buttonHoverStyle = {
          backgroundColor: '#0a245f'
        };
      
        const buttonActiveStyle = {
          boxShadow: '0px 2px 2px 0px rgba(0, 0, 0, 0.25)',
          transform: 'translateY(2px)'
        };
      
        const [buttonCurrentStyle, setButtonCurrentStyle] = React.useState(buttonStyle);
      
        const handleMouseOver = () => {
          setButtonCurrentStyle({ ...buttonStyle, ...buttonHoverStyle });
        };
      
        const handleMouseOut = () => {
          setButtonCurrentStyle(buttonStyle);
        };
      
        const handleMouseDown = () => {
          setButtonCurrentStyle({ ...buttonStyle, ...buttonActiveStyle });
        };
      
        const handleMouseUp = () => {
          setButtonCurrentStyle(buttonStyle);
        };
      
        return (
          <button 
            style={buttonCurrentStyle}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onClick={onClick}
          >
            {children}
          </button>
        )
      }
  

export default SubmitButton
