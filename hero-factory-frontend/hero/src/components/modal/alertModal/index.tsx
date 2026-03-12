import React, { useEffect } from 'react';
import ModalBase from '../index';
import './styles.css';

interface AlertModalProps {
  title: string;
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const AlertModal: React.FC<AlertModalProps> = ({ title, message, type, onClose }) => {
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 15000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <ModalBase title={title} onClose={onClose}>
      <div className={`alert-modal-body ${type}`}>
        <div className="alert-icon">
          {type === 'success' ? '✅' : '❌'}
        </div>
        <p className="alert-message">{message}</p>
        <div className="progress-bar-container">
          <div className="progress-bar-fill"></div>
        </div>
        <small className="alert-footer">Fecha automaticamente em 15s</small>
      </div>
    </ModalBase>
  );
};

export default AlertModal;