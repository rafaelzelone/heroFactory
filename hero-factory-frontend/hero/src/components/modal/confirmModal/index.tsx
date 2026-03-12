import React, { type PropsWithChildren } from 'react';
import ModalBase from '../index';
import './styles.css';
import Button from '../../button';

interface ConfirmModalProps {
  title: string;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'primary';
}

const ConfirmModal: React.FC<PropsWithChildren<ConfirmModalProps>> = ({
  title,
  message,
  onClose,
  onConfirm,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  variant = 'danger'
}) => {
  return (
    <ModalBase title={title} onClose={onClose}>
      <div className="confirm-modal-content">
        <p className="confirm-message">{message}</p>
        
        <div className="confirm-actions">
          <Button variant="secondary" onClick={onClose}>
            {cancelText}
          </Button>
          <Button 
            className={`btn-${variant}`} 
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </ModalBase>
  );
};

export default ConfirmModal;