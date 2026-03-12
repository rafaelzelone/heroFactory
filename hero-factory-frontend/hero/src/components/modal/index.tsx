import React, { type PropsWithChildren } from 'react'; 
import './styles.css';

interface ModalBaseProps {
  title: string;
  onClose: () => void;
}

const ModalBase: React.FC<PropsWithChildren<ModalBaseProps>> = ({ children, title, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalBase;