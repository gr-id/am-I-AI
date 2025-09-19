import React, { useEffect, useState } from 'react';
import { Image } from '../types';
import './ImageModal.css';

interface ImageModalProps {
  image: Image;
  isOpen: boolean;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ image, isOpen, onClose }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-container">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        
        <div className="modal-content">
          <div className="modal-image-container">
            {!imageLoaded && (
              <div className="modal-loading">
                <div className="loading-spinner"></div>
                <p>이미지 로딩 중...</p>
              </div>
            )}
            <img
              src={image.url}
              alt={`AI Generated Image ${image.id}`}
              className={`modal-image ${imageLoaded ? 'loaded' : ''}`}
              onLoad={handleImageLoad}
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
          
          <div className="modal-info">
            <div className="info-item">
              <span className="info-label">폴더:</span>
              <span className="info-value">{image.folder}</span>
            </div>
            <div className="info-item">
              <span className="info-label">형식:</span>
              <span className="info-value">{image.format.toUpperCase()}</span>
            </div>
            <div className="info-item">
              <span className="info-label">크기:</span>
              <span className="info-value">{image.width} × {image.height}</span>
            </div>
            <div className="info-item">
              <span className="info-label">생성일:</span>
              <span className="info-value">
                {new Date(image.created_at).toLocaleDateString('ko-KR')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
