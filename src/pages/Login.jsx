import React, { useEffect, useContext } from 'react';
import LoginForm from '../components/Users/LoginForm';
import { ColorContext } from '../App';

const styles = {
  headerStyle: {
    marginTop: '140px',
    marginBottom: '0px',
    color: '#1B3672',
    fontSize: '35px',
    fontWeight: 900,
  }
}

const Login = () => {
  const { setBgColor } = useContext(ColorContext);

  useEffect(() => {
    // ローカルストレージから背景色を取得して設定
    const storedBgColor = localStorage.getItem('bgColor');
    if (storedBgColor) {
      setBgColor(storedBgColor);
    }
  }, [setBgColor]);

  return (
    <div>
      <div className='bigLogo'>
        <h1 style={styles.headerStyle}>
          omoi flowers
        </h1>
      </div>
      <LoginForm/>
    </div>
  )
}

export default Login;
