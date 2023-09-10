import React from 'react';
import LoginForm from '../components/Introduction/LoginForm';

const styles = {
  headerStyle: {
    marginTop: '120px',
    marginBottom: '0px',
    color: '#1B3672',
    fontSize: '35px',
    fontWeight: 900,
  }
}

const Login = () => {
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

