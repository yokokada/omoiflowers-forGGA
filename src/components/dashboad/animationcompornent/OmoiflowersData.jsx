import React from 'react'
import './omoiflowers.css'


const omoiflowersData = () => {
  return (
    <div className='omoiFlowersData'>
    <div className='dataBoxWrap'>
        {/* <h1>クリックデータ</h1> */}
        <div className='dataBox'>
            <p>今までできた花束</p>
            <p>束</p>
        </div>
        <div className='dataBox'>
            <p>累積omoってるよ</p>
            <p>回</p>
            <p>詳細→</p>
        </div>
        <div className='dataBox'>
            <p>今日のomoってるよ</p>
            <p>回</p>
            <p>詳細→</p>
        </div>
    </div>
    </div>
  )
}

export default omoiflowersData
