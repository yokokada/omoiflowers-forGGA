import React from 'react';
import './AllPost.css';

const DisplayMergedData = ({ data }) => {
  if (!data) return null;

  return (
    <div className='cardArea'>
       <div className='allPostCard'>
            {
                data.imageUrl ? (
                    <div className='cardImage'>
                    <img src={data.imageUrl} alt="Uploaded content" />
                    </div>
                ) : null
                }
            <div className="displayArea">
            <h2>{data.title}</h2>
            <p>{data.message}</p>
            </div>
        </div>
    </div>
 
   
  );
}

export default DisplayMergedData;
