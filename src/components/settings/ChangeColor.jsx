import React, { useContext }  from 'react'
import '../.././App.css';
import { ColorContext } from '../../App';
import {Tabs, Tab} from "@nextui-org/react";

const ChangeColor = () => {
    const { setBgColor } = useContext(ColorContext);
    const variants = [
      "solid"
    ];
    
      return (
        <div className='changeColorcontent'>
          <p>背景色選択</p>
          <div className="flex w-full flex-col">
          {variants.map((variant) => (<Tabs key={variant} variant={variant} aria-label="Tabs variants">
              <Tab
                key="videos"
                title={
                  <div className="flex items-center space-x-2">
                    <div className='circle-p'></div>
                    <span>ピンク</span>
                  </div>
                }
              />
              <Tab
                key="photos"
                title={
                  <div className="flex items-center space-x-2">
                     <div className='circle-b'></div>
                    <span>水色</span>
                  </div>
                }
              />
              <Tab
                key="music"
                title={
                  <div className="flex items-center space-x-2">
                    <div className='circle-y'></div>
                    <span>黄色</span>
                  </div>
                }
              />
               
          </Tabs>
           ))}
        </div>        
        </div>
      );
    };

export default ChangeColor
