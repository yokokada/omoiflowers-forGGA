import React, { useContext , useEffect }  from 'react'
import '../.././App.css';
import { ColorContext } from '../../App';
import {Tabs, Tab} from "@nextui-org/react";

const ChangeColor = () => {
    const { setBgColor } = useContext(ColorContext);

    const currentColor = localStorage.getItem('bgColor');
    let defaultTabKey = 'pink';  // デフォルトのタブをピンクに設定

    switch(currentColor) {
      case 'rgb(253, 233, 233)':
          defaultTabKey = 'pink';
          break;
      case 'rgb(233, 253, 252)':
          defaultTabKey = 'cyan';
          break;
      case 'rgb(253, 253, 233)':
          defaultTabKey = 'yellow';
          break;
      default:
          break;
  }

  // ページのロード時にローカルストレージから取得した背景色を設定
  useEffect(() => {
    if (currentColor) {
        setBgColor(currentColor);
    }
}, [currentColor, setBgColor]);

    const handleTabChange = (key) => {
      let selectedColor = ''; // ここで選択された色を保存します
  
      switch(key) {
          case 'pink':
              selectedColor = 'rgb(253, 233, 233)'; // ピンク色を設定
              break;
          case 'cyan':
              selectedColor = 'rgb(233, 253, 252)'; // 水色を設定
              break;
          case 'yellow':
              selectedColor = 'rgb(253, 253, 233)'; // 黄色を設定
              break;
          default:
              break;
      }
  
      // 色をstateとローカルストレージに保存
      if (selectedColor) {
          setBgColor(selectedColor);
          localStorage.setItem('bgColor', selectedColor);
          console.log("ローカルストレージに保存:", localStorage.getItem('bgColor')); // この行を追加
      }
  };
  

      return (
        <div className='changeColorcontent'>
          <p>背景色選択</p>
          <div className="flex w-full flex-col">
          <Tabs aria-label="背景色変更" defaultActiveKey={defaultTabKey}onSelectionChange={handleTabChange}>
              <Tab
                key="pink"
                title={
                  <div className="flex items-center space-x-2">
                    <div className='circle-p'></div>
                    <span>ピンク</span>
                  </div>
                }
              />
              <Tab
                key="cyan"
                title={
                  <div className="flex items-center space-x-2">
                     <div className='circle-b'></div>
                    <span>水色</span>
                  </div>
                }
              />
              <Tab
                key="yellow"
                title={
                  <div className="flex items-center space-x-2">
                    <div className='circle-y'></div>
                    <span>黄色</span>
                  </div>
                }
              />
               
          </Tabs>
        </div>        
        </div>
      );
    };

export default ChangeColor
