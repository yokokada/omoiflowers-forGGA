import React, { useState } from 'react';
import { Emoji, Hospital } from 'iconoir-react';
import './EventModal.css';
import {Button} from "@nextui-org/react";

const EventModal = ({isOpen, date, onIconToggle, iconsWithTime, setIconsWithTime, startTime, setStartTime, endTime, setEndTime, onSave }) => {
    const [selectedIcons, setSelectedIcons] = useState({}); // 選択されたアイコンを格納するステート
    const [comments, setComments] = useState({});

    if (!isOpen) {
        return null;
    }

    const onTimeChange = (iconName, timeType, value) => {
        console.log("Changing time:", iconName, timeType, value);  // これを追加
        setIconsWithTime(prev => {
            const updatedIcon = {
                ...prev[iconName],
                [timeType === 'start' ? 'startTime' : 'endTime']: value
            };
            return { ...prev, [iconName]: updatedIcon };
        });
    };

    const onIconChange = (iconName, selectedOption) => {
        setSelectedIcons(prev => ({
            ...prev,
            [iconName]: selectedOption
        }));
    };

    const onCommentChange = (iconName, e) => {
        setComments(prev => ({
            ...prev,
            [iconName]: e.target.value
        }));
    };

    const renderIconRow = (IconComponent, iconName, text) => (
        <div className="icon-row">
            <div className="icon-text">
                <IconComponent fontSize={24} className={iconsWithTime[iconName]?.selected ? 'icon-row-selected' : ''} onClick={() => onIconToggle(iconName)} />
                <p>{text}</p>
            </div>
            {iconsWithTime[iconName]?.selected && (
                <>
                    <div className="input-row">
                        <input type="time" value={iconsWithTime[iconName]?.startTime} onChange={(e) => onTimeChange(iconName, 'start', e.target.value)} className="time-input" />
                        〜
                        <input type="time" value={iconsWithTime[iconName]?.endTime} onChange={(e) => onTimeChange(iconName, 'end', e.target.value)} />
                        <select value={selectedIcons[iconName] || ''} onChange={(e) => onIconChange(iconName, e.target.value)}>
                            <option value="hospital">病院</option>
                            <option value="home">家</option>
                            <option value="other">その他</option>
                        </select>
                    </div>
                    <div className="input-row">
                        <input 
                        type="text" 
                        placeholder="コメントを追加" 
                        value={comments[iconName] || ''}  // この行を変更
                        onChange={(e) => onCommentChange(iconName, e)}  // この行を変更
                        className="comment-input" />
                    </div>
                </>
            )}
        </div>
    );

    return (
        <div className='eventModal'>
            <h3>{date}</h3>
            {renderIconRow(Emoji, "emoji", "お見舞い　")}
            {renderIconRow(Hospital, "hospital", "治療＆ケア")}
            <Button style={{ backgroundColor:'#1B3672',color:'white' }} onClick={onSave}>保存</Button>
        </div>
    );
}

export default EventModal;
