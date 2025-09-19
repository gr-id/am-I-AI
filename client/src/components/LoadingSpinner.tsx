import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="loading-spinner-container">
      <div className="loading-spinner"></div>
      <p>이미지를 불러오는 중...</p>
    </div>
  );
};

export default LoadingSpinner;
