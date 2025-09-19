import React from 'react';
import './UnderConstructionModal.css';

interface UnderConstructionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UnderConstructionModal: React.FC<UnderConstructionModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        
        <div className="modal-content">
          <div className="construction-icon">🚧</div>
          <h2 className="modal-title">UNDER CONSTRUCTION</h2>
          <p className="modal-message">
            This feature is currently under development.<br />
            Please check back later!
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnderConstructionModal;
