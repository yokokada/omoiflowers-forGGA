import React, { useState } from 'react';
import './WishList.css'

const EditTodoModal = ({ showModal, closeModal, updateTodo, initialText }) => {
    const [updatedText, setUpdatedText] = useState(initialText);
  
    const handleUpdateTodo = () => {
      updateTodo({ text: updatedText });
      closeModal();
    };
  
    return (
      <div className='addListModal'>
        <h3>リスト変更</h3>
        <div>
          <input
            type="text"
            value={updatedText}
            onChange={(e) => setUpdatedText(e.target.value)}
          />
        </div>
        <div className='modalButton'>
          <button onClick={closeModal}>キャンセル</button>
          <button onClick={handleUpdateTodo}>　　更新　</button>
        </div>
      </div>
    );
  };
  
  export default EditTodoModal;