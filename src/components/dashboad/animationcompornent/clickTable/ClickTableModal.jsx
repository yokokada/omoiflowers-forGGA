import React from 'react';
import './ClickTable.css';
import ReactDOM from 'react-dom';


const Modal = ({ show, onClose, children }) => {
  if (!show) return null;

  return ReactDOM.createPortal(
    (
    <div className="modal">
      <div className="modal-content">
        <span className="closeButton" onClick={onClose}>&times;</span>
        {children}
      </div>
    </div>
     ),
     document.body // ここでbody要素を指定しています
  );
};

export default Modal;
