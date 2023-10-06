import React from "react";
import {Tabs, Tab, Button} from "@nextui-org/react";
import { EmojiSad,EmojiLookDown,EmojiQuite,EmojiSatisfied,EmojiBlinkRight } from "iconoir-react";
import './Physicalcondition.css'

export default function App() {
  const sizes = [
    "md",
  ];

  return (
    <div className="physicalScaleWrap">
      <h1>今日の自分はどんな感じ？</h1>
    <div className="physicalScale">
      <div className='physicalScaleTitle'>
        <p>体調</p>
      </div>
      <div>
      {sizes.map((size) => (
        <Tabs key={size} size={size} aria-label="Tabs sizes">
          <Tab 
          key="worst" 
          title={<EmojiSad fontSize={'16px'}/>}
          />
          <Tab 
          key="bad" 
          title={<EmojiLookDown fontSize={'16px'}/>}
          />
          <Tab key="so-so" 
          title={<EmojiQuite fontSize={'16px'}/>}
          />
          <Tab 
          key="good" 
          title={<EmojiSatisfied fontSize={'16px'}/>}
          />
          <Tab 
          key="grate" 
          title={<EmojiBlinkRight fontSize={'16px'}/>}
          />
        </Tabs>
      ))}
    </div>
  </div>
    <div className="dailyTweet">
      <label htmlFor=""><p>ひと<br/>こと</p></label>
      <input 
      type="text" 
      /> 
    </div>
    <Button style={{ backgroundColor:'#1B3672', color:'white', marginTop:'4px'}}>保存</Button>

    
  </div>
  );
}
