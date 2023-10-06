import React, { useState } from 'react';
import TodoList from './WishListPage';
import './WishList.css'
import { Bold } from 'iconoir-react';

const TodoTabs = () => {
  const [activeTab, setActiveTab] = useState('todo1');
  const [todos, setTodos] = useState({
    todo1: [],
    todo2: [],
    todo3: [],
    todo4: [],
  });

  const addTodo = (tabName, todo) => {
    setTodos({
      ...todos,
      [tabName]: [...todos[tabName], todo],
    });
  };

  const deleteTodo = (tabName, index) => {
    setTodos({
      ...todos,
      [tabName]: todos[tabName].filter((_, i) => i !== index),
    });
  };

  const getButtonStyle = (tabName) => {
    if (activeTab === tabName) {
      return { 
        // border: '2px solid #1B3672',
        // boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.1);', 
        fontWeight:'Bold',
        color: '#F39459',
      };
    } else {
      return {};
    }
  };

  return (
    <div>
    <div className='ListAllWraper'>
    <div className='ListTittle'>
    <h1><span>Wish List</span></h1>
    <div className='wishTab'>
      <button 
        onClick={() => setActiveTab('todo1')}
        style={getButtonStyle('todo1')}
      >
        欲しいもの<br/>（日用品）
      </button>
      <button 
        onClick={() => setActiveTab('todo2')}
        style={getButtonStyle('todo2')}
      >
        欲しいもの
      </button>
      <button 
        onClick={() => setActiveTab('todo3')}
        style={getButtonStyle('todo3')}
      >
        やりたいこと
      </button>
      <button 
        onClick={() => setActiveTab('todo4')}
        style={getButtonStyle('todo4')}
      >
        してくれると<br/>嬉しいこと
      </button>
      </div>
        
    </div>
    
      <div className='listWraper'>
      {activeTab === 'todo1' && (
        <TodoList
          activeTab={activeTab}  // 追加
          todos={todos.todo1}
          addTodo={(todo) => addTodo('todo1', todo)}
          deleteTodo={(index) => deleteTodo('todo1', index)}
        />
      )}
      {activeTab === 'todo2' && (
        <TodoList
          activeTab={activeTab}  // 追加
          todos={todos.todo2}
          addTodo={(todo) => addTodo('todo2', todo)}
          deleteTodo={(index) => deleteTodo('todo2', index)}
        />
      )}
      {activeTab === 'todo3' && (
        <TodoList
          activeTab={activeTab}  // 追加
          todos={todos.todo3}
          addTodo={(todo) => addTodo('todo3', todo)}
          deleteTodo={(index) => deleteTodo('todo3', index)}
        />
      )}
      {activeTab === 'todo4' && (
        <TodoList
          activeTab={activeTab}  // 追加
          todos={todos.todo3}
          addTodo={(todo) => addTodo('todo4', todo)}
          deleteTodo={(index) => deleteTodo('todo4', index)}
        />
      )}
    </div>
   
    </div>
    </div>
  );
};

export default TodoTabs;
