import React, { useContext , useEffect , useState }  from 'react'
import '../.././App.css';
import { ColorContext } from '../../App';
import {Tabs, Tab} from "@nextui-org/react";

const ChangeColor = () => {
  const colorMapping = {
    'rgb(253, 233, 233)': 'pink',
    'rgb(233, 253, 252)': 'cyan',
    'rgb(253, 253, 233)': 'yellow'
  };
  
  const currentColor = localStorage.getItem('bgColor')|| 'rgb(253, 233, 233)';
  const initialTab = colorMapping[currentColor] ;
  const { setBgColor } = useContext(ColorContext);
  const [activeTab, setActiveTab] = useState(initialTab);

  // ページのロード時にローカルストレージから取得した背景色を設定
  useEffect(() => {
    if (currentColor) {
        setBgColor(currentColor);
        switch(currentColor) {  // switch文をここに移動
          case 'rgb(253, 233, 233)':
              setActiveTab('pink');
              break;
          case 'rgb(233, 253, 252)':
              setActiveTab('cyan');
              break;
          case 'rgb(253, 253, 233)':
              setActiveTab('yellow');
              break;
          default:
              break;
      }
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
          setActiveTab(key); // この行を変更
      }
  };

  useEffect(() => {
    if (currentColor) {
        setBgColor(currentColor);
    }
  }, [currentColor, setBgColor]);
  

      return (
        <div className='changeColorcontent'>
          <p>背景色選択</p>
          <div className="flex w-full flex-col">
          <Tabs aria-label="背景色変更"  selectedKey={activeTab} onSelectionChange={handleTabChange}>
              <Tab
                key="pink"
                title={
                  <div style={{color:'#1B3672'}} className="flex items-center space-x-2">
                    <div className='circle-p'></div>
                    <span>ピンク</span>
                  </div>
                }
              />
              <Tab
                key="cyan"
                title={
                  <div style={{color:'#1B3672'}}  className="flex items-center space-x-2">
                     <div className='circle-b'></div>
                    <span>水色</span>
                  </div>
                }
              />
              <Tab
                key="yellow"
                title={
                  <div style={{color:'#1B3672'}}  className="flex items-center space-x-2">
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
