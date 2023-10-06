import React from 'react';
import { Checkbox } from '@nextui-org/react';
import { Trash, LineSpace } from 'iconoir-react';
import './WishList.css'
import { useAdminFlag } from '../../context/AdminFlagContext'


const TodoItem = ({ index, todo, deleteTodo, startDrag, endDrag, isDragging, openEditModal }) => {
    const { adminFlag, isLoading,uid,displayName,tail } = useAdminFlag(); // <-- useAdminFlagで取得

  return (
    <div 
      className={`listItemWrapper ${isDragging ? 'dragging' : ''}`} 
      draggable 
      onDragStart={() => startDrag(index)} 
    //   onDragEnd={() => endDrag(index)}
    >
      <div className='list'>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* このdivでチェックボックスを囲む */}
            <div onClick={(e) => e.stopPropagation()}>
            {adminFlag !== 3 &&<Checkbox 
                  defaultSelected={todo.completed}
              />}
            </div>
            <div className='listDisplay' onClick={() => openEditModal(index)}>
              {todo.text}
            </div>
          </div>
          {adminFlag === 0 && <div className='listItemButton'>
              <button onClick={() => startDrag(index)}><LineSpace/></button>
              <button onClick={() => deleteTodo(index)}><Trash/></button>
          </div>}
      </div>
    </div>
  );
}; 

export default TodoItem;
