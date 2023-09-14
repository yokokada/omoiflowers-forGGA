import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

const Qrcord = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '80px' }}>
      <QRCodeSVG value="https://reactjs.org/" />
    </div>
  );
}

export default Qrcord;

