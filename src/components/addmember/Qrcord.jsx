import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

const Qrcord = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '80px' }}>
      <QRCodeSVG value="https://omoiflowers-ver-2.vercel.app/" />
    </div>
  );
}

export default Qrcord;

