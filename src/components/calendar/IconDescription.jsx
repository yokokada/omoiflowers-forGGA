import React from 'react';
import { Emoji, Hospital, Edit } from 'iconoir-react';

const IconDescription = () => {
  return (
    <div style={{ marginLeft:'4px',padding: '10px', display: 'flex', justifyContent: 'left', alignItems: 'center' ,fontSize:'14px'}}>
      <Emoji fontSize={14} strokeWidth={1} />
      <span style={{ marginLeft: '5px' }}>お見舞いOK</span>
      <Hospital fontSize={14} strokeWidth={1} style={{ marginLeft: '15px' }} />
      <span style={{ marginLeft: '5px' }}>治療＆ケア</span>
      <Edit fontSize={14} strokeWidth={1} style={{ marginLeft: '15px' }} />
      <span style={{ marginLeft: '5px' }}>投稿</span>
    </div>
  );
}

export default IconDescription;
