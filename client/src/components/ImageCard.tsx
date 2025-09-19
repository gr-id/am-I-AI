import React, { useState } from 'react';
import { Image } from '../types';
import ImageModal from './ImageModal';
import './ImageCard.css';

interface ImageCardProps {
  image: Image;
}

const ImageCard: React.FC<ImageCardProps> = ({ image }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };


  return (
    <>
      <div className="image-card" onClick={handleImageClick}>
        <div className="image-container">
          {!imageLoaded && (
            <div className="image-placeholder">
              <div className="loading-spinner-small"></div>
            </div>
          )}
          <img
            src={image.thumbnail}
            alt={`AI Generated Image ${image.id}`}
            className={`image-thumbnail ${imageLoaded ? 'loaded' : ''}`}
            onLoad={handleImageLoad}
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>
      </div>

      {isModalOpen && (
        <ImageModal
          image={image}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default ImageCard;
