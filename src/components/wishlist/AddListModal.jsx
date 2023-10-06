import React, { useState } from 'react';
import './WishList.css'

const AddTodoModal = ({ showModal, closeModal, addTodo }) => {
  const [newTodoText, setNewTodoText] = useState('');

  const handleAddTodo = () => {
    addTodo({ text: newTodoText, completed: false });
    setNewTodoText('');
    closeModal();
  };

  return (
    <div className='addListModal'>
        <h3>リスト追加</h3>
        <div>
        <input
        type="text"
        value={newTodoText}
        onChange={(e) => setNewTodoText(e.target.value)}
        />
        </div>
      <div className='modalButton'>
        <button onClick={closeModal}>キャンセル</button>
        <button onClick={handleAddTodo}>　　追加　</button>
      </div>
    </div>
  );
};

export default AddTodoModal;
